import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { Repository } from 'typeorm';
import { forwardRef, Inject } from '@nestjs/common';
import axios from 'axios';
import { python_ai_endpoint } from 'src/api-conf';
import { log } from 'console';
import { Media_filesService } from 'src/media_files/services/Media_file.service';

@Injectable()
export class RechercheService {
    
    constructor(
        @InjectRepository(Media) private mediaRepository: Repository<Media>,
        private media_file_service: Media_filesService
    ) {}

    async search(textToSearch: any){
        var medias: Media[] = await this.mediaRepository.find();
        const url = python_ai_endpoint + ":1113/compare";
        for(let i = 0; i < medias.length; i++){
            const data =  {
                word: medias[i].media_ia_descriptor,
                search: textToSearch.recherche
            };
            const response: any = await axios.post(url, data);
            medias[i].score = parseFloat(response.data.score); 
            medias[i].file = await this.media_file_service.findMedia_files_by_media(medias[i].media_id);   
        }
        medias.sort((a, b) => b.score - a.score); // trier les medias selon le score
        return medias;
    }
}

