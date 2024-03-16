import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { Repository } from 'typeorm';
import { forwardRef, Inject } from '@nestjs/common';
import axios from 'axios';
import { python_ai_endpoint } from 'src/api-conf';

@Injectable()
export class RechercheService {
    
    constructor(
        @InjectRepository(Media) private mediaRepository: Repository<Media>,
    ) {}

    async search(textToSearch: string){
        var medias: Media[] = await this.mediaRepository.find();
        for(let i = 0; i < medias.length; i++){ // pour chaque media de la base de donnée
            // miala tsiny kely 
            const response: any = await axios.post(python_ai_endpoint + ":1113/compare/", {
                search: textToSearch,
                word: medias[i].media_ia_descriptor
            });
            console.log("Response ",response);
            medias[i].score = parseFloat(response.score); // ajouter un score au media
        }
        medias.sort((a, b) => b.score - a.score); // trier les medias selon la recherche
        return medias;
    }
}

