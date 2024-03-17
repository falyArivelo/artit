import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exposition_media } from 'src/entities/Exposition_media.entity';
import { CreateExposition_mediaDto } from 'src/exposition_medias/dtos/CreateExposition_media.dto';
import { UpdateExposition_mediaDto } from 'src/exposition_medias/dtos/UpdateExposition_media.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Exposition_mediasService {
    constructor(
        @InjectRepository(Exposition_media) private exposition_mediasRepository: Repository<Exposition_media>,
    ) { }

    findExposition_medias() {
        return this.exposition_mediasRepository.find({relations:[
            'media',
            ]})
    }

    findExposition_mediaById(exposition_media_id: number) {
        const exposition_medias = this.exposition_mediasRepository.findOne({
           where: { exposition_media_id },
           relations:[
            'media',
            ]
            });

        if (!exposition_medias) {
            throw new NotFoundException(`Exposition_media with ID not found`);
        }

        return exposition_medias;
    }

   async createExposition_media(createExposition_mediaDto: CreateExposition_mediaDto) {
         try {
         const { media_id ,} = createExposition_mediaDto;
        const newExposition_media = this.exposition_mediasRepository.create({
                media: { media_id: media_id },
          });
         await this.exposition_mediasRepository.save(newExposition_media);
         return 'La  Exposition_media a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Exposition_media');
            // throw new NotFoundException('Échec de la création de la Exposition_media');
          }
    }

    async updateExposition_media(exposition_media_id: number, updateExposition_mediaDto: UpdateExposition_mediaDto) {
        //return this.exposition_mediasRepository.update({ exposition_media_id }, { ...updateExposition_mediaDto });
            try {
            const {media_id ,} = updateExposition_mediaDto;
            const updateResult = await this.exposition_mediasRepository.update({ exposition_media_id }, { 
                  media: { media_id: media_id },
             });

            if (updateResult.affected > 0) {
              return 'La Exposition_media a été mise à jour avec succès.';
            } else {
              throw new Error('La Exposition_media avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Exposition_media :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Exposition_media.');
          }
    }

    async deleteExposition_mediaById(exposition_media_id: number) {
        //return this.exposition_mediasRepository.delete({ exposition_media_id });
    
        try {
            const deleteResult = await this.exposition_mediasRepository.delete({ exposition_media_id });
        
            if (deleteResult.affected === 1) {
              return 'La Exposition_media a été supprimée avec succès.';
            } else {
                throw new Error('La Exposition_media avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Exposition_media :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Exposition_media');
          
        }
    }


}
