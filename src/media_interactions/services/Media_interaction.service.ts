import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media_interaction } from 'src/entities/Media_interaction.entity';
import { CreateMedia_interactionDto } from 'src/media_interactions/dtos/CreateMedia_interaction.dto';
import { UpdateMedia_interactionDto } from 'src/media_interactions/dtos/UpdateMedia_interaction.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Media_interactionsService {
    constructor(
        @InjectRepository(Media_interaction) private media_interactionsRepository: Repository<Media_interaction>,
    ) { }

    findMedia_interactions() {
        return this.media_interactionsRepository.find({relations:[
            'media',
            'user',
            ]})
    }

    findMedia_interactionById(media_interactions_id: number) {
        const media_interactions = this.media_interactionsRepository.findOne({
           where: { media_interactions_id },
           relations:[
            'media',
            'user',
            ]
            });

        if (!media_interactions) {
            throw new NotFoundException(`Media_interaction with ID not found`);
        }

        return media_interactions;
    }

   async createMedia_interaction(createMedia_interactionDto: CreateMedia_interactionDto) {
         try {
         const { media_id ,user_id ,} = createMedia_interactionDto;
        const newMedia_interaction = this.media_interactionsRepository.create({
                media: { media_id: media_id },
                user: { user_id: user_id },
          });
         await this.media_interactionsRepository.save(newMedia_interaction);
         return 'La  Media_interaction a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Media_interaction');
            // throw new NotFoundException('Échec de la création de la Media_interaction');
          }
    }

    async updateMedia_interaction(media_interactions_id: number, updateMedia_interactionDto: UpdateMedia_interactionDto) {
        //return this.media_interactionsRepository.update({ media_interactions_id }, { ...updateMedia_interactionDto });
            try {
            const {media_id ,user_id ,} = updateMedia_interactionDto;
            const updateResult = await this.media_interactionsRepository.update({ media_interactions_id }, { 
                  media: { media_id: media_id },
                  user: { user_id: user_id },
             });

            if (updateResult.affected > 0) {
              return 'La Media_interaction a été mise à jour avec succès.';
            } else {
              throw new Error('La Media_interaction avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Media_interaction :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Media_interaction.');
          }
    }

    async deleteMedia_interactionById(media_interactions_id: number) {
        //return this.media_interactionsRepository.delete({ media_interactions_id });
    
        try {
            const deleteResult = await this.media_interactionsRepository.delete({ media_interactions_id });
        
            if (deleteResult.affected === 1) {
              return 'La Media_interaction a été supprimée avec succès.';
            } else {
                throw new Error('La Media_interaction avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Media_interaction :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Media_interaction');
          
        }
    }


}
