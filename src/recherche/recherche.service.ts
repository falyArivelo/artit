import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { Repository } from 'typeorm';
import { forwardRef, Inject } from '@nestjs/common';
import axios from 'axios';
import { python_ai_endpoint } from 'src/api-conf';
import { log } from 'console';
import { Media_filesService } from 'src/media_files/services/Media_file.service';
import { User_historique } from 'src/entities/User_historique.entity';

@Injectable()
export class RechercheService {
    
    constructor(
        @InjectRepository(Media) private mediaRepository: Repository<Media>,
        private media_file_service: Media_filesService,
        @InjectRepository(User_historique) private user_historiqueRepository: Repository<User_historique>
    ) {}

    saveUserSearch(user_id: number, last_search: string){
        var user_historique = new User_historique();
        user_historique.user_id = user_id;
        user_historique.last_search = last_search;
        this.user_historiqueRepository.save(user_historique);
    }

    async search(textToSearch: any){
        var text = textToSearch.recherche;
        const response = await axios.post(python_ai_endpoint + ":1114/translate", {"text": text});
        text = response.data.translation;
        
        this.saveUserSearch(textToSearch.user_id, text);

        var medias: Media[] = await this.mediaRepository.find();
        const url = python_ai_endpoint + ":1113/compare";
        for(let i = 0; i < medias.length; i++){
            const data =  {
                word: medias[i].media_ia_descriptor,
                search: text
            };
            const response: any = await axios.post(url, data);
            const scoreByApi = parseFloat(response.data.score);
            medias[i].score = scoreByApi;
            medias[i].file = await this.media_file_service.findMedia_files_by_media(medias[i].media_id); 
        }
        medias.sort((a, b) => b.score - a.score); // trier les medias selon le score
        return { "medias": medias, "translated_text": text, "original_text": textToSearch.recherche};
    }
}

