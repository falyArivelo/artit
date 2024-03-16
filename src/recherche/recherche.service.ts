import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { Repository } from 'typeorm';
import { forwardRef, Inject } from '@nestjs/common';

@Injectable()
export class RechercheService {
    
    constructor(
        @InjectRepository(Media) private mediaRepository: Repository<Media>,
    ) {}

    async search(textToSearch: string){
        var medias: Media[] = await this.mediaRepository.find();
        for(let i = 0; i < medias.length; i++){ // pour chaque media de la base de donnée
            let words = medias[i].media_key_word.split(/\b(?=[^\w\s])|[\s,.!?;:-]+/); // obtenir les mots de la description
            let score = this.compareTextArray(textToSearch.split(/\b(?=[^\w\s])|[\s,.!?;:-]+/), words); // comparer les mots de la recherche avec les mots de la description
            medias[i].score = score; // ajouter un score au media
        }
        medias.sort((a, b) => b.score - a.score); // trier les medias selon la recherche
        return medias;
    }

    private compareTextArray(text1: string[], text2: string[]){
        var score = 0;
        for(let i = 0; i < text1.length; i++){
            if(text2.includes(text1[i])){
                score += 1;
            }
        }
        return score;
    }
}

