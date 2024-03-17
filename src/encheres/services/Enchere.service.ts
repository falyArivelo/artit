import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enchere } from 'src/entities/Enchere.entity';
import { CreateEnchereDto } from 'src/encheres/dtos/CreateEnchere.dto';
import { UpdateEnchereDto } from 'src/encheres/dtos/UpdateEnchere.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EncheresService {
    constructor(
        @InjectRepository(Enchere) private encheresRepository: Repository<Enchere>,
    ) { }

    findEncheres() {
        return this.encheresRepository.find({relations:[
            'event',
            'media',
            ]})
    }

    findEnchereById(enchere_id: number) {
        const encheres = this.encheresRepository.findOne({
           where: { enchere_id },
           relations:[
            'event',
            'media',
            ]
            });

        if (!encheres) {
            throw new NotFoundException(`Enchere with ID not found`);
        }

        return encheres;
    }

   async createEnchere(createEnchereDto: CreateEnchereDto) {
         try {
         const { event_id ,enchere_name ,enchere_price_base ,media_id ,} = createEnchereDto;
        const newEnchere = this.encheresRepository.create({
            enchere_name ,
            enchere_price_base ,
                event: { event_id: event_id },
                media: { media_id: media_id },
          });
         await this.encheresRepository.save(newEnchere);
         return 'La  Enchere a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Enchere');
            // throw new NotFoundException('Échec de la création de la Enchere');
          }
    }

    async updateEnchere(enchere_id: number, updateEnchereDto: UpdateEnchereDto) {
        //return this.encheresRepository.update({ enchere_id }, { ...updateEnchereDto });
            try {
            const {event_id ,enchere_name ,enchere_price_base ,media_id ,} = updateEnchereDto;
            const updateResult = await this.encheresRepository.update({ enchere_id }, { 
                enchere_name ,
                enchere_price_base ,
                  event: { event_id: event_id },
                  media: { media_id: media_id },
             });

            if (updateResult.affected > 0) {
              return 'La Enchere a été mise à jour avec succès.';
            } else {
              throw new Error('La Enchere avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Enchere :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Enchere.');
          }
    }

    async deleteEnchereById(enchere_id: number) {
        //return this.encheresRepository.delete({ enchere_id });
    
        try {
            const deleteResult = await this.encheresRepository.delete({ enchere_id });
        
            if (deleteResult.affected === 1) {
              return 'La Enchere a été supprimée avec succès.';
            } else {
                throw new Error('La Enchere avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Enchere :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Enchere');
          
        }
    }


}
