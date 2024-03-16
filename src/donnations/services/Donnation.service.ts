import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donnation } from 'src/entities/Donnation.entity';
import { CreateDonnationDto } from 'src/donnations/dtos/CreateDonnation.dto';
import { UpdateDonnationDto } from 'src/donnations/dtos/UpdateDonnation.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DonnationsService {
    constructor(
        @InjectRepository(Donnation) private donnationsRepository: Repository<Donnation>,
    ) { }

    findDonnations() {
        return this.donnationsRepository.find({relations:[
            'user',
            'event',
            ]})
    }

    findDonnationById(donnation_id: number) {
        const donnations = this.donnationsRepository.findOne({
           where: { donnation_id },
           relations:[
            'user',
            'event',
            ]
            });

        if (!donnations) {
            throw new NotFoundException(`Donnation with ID not found`);
        }

        return donnations;
    }

   async createDonnation(createDonnationDto: CreateDonnationDto) {
         try {
         const { user_id ,event_id ,donnation_montant ,donnation_date ,} = createDonnationDto;
        const newDonnation = this.donnationsRepository.create({
            donnation_montant ,
            donnation_date ,
                user: { user_id: user_id },
                event: { event_id: event_id },
          });
         await this.donnationsRepository.save(newDonnation);
         return 'La  Donnation a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Donnation');
            // throw new NotFoundException('Échec de la création de la Donnation');
          }
    }

    async updateDonnation(donnation_id: number, updateDonnationDto: UpdateDonnationDto) {
        //return this.donnationsRepository.update({ donnation_id }, { ...updateDonnationDto });
            try {
            const {user_id ,event_id ,donnation_montant ,donnation_date ,} = updateDonnationDto;
            const updateResult = await this.donnationsRepository.update({ donnation_id }, { 
                donnation_montant ,
                donnation_date ,
                  user: { user_id: user_id },
                  event: { event_id: event_id },
             });

            if (updateResult.affected > 0) {
              return 'La Donnation a été mise à jour avec succès.';
            } else {
              throw new Error('La Donnation avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Donnation :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Donnation.');
          }
    }

    async deleteDonnationById(donnation_id: number) {
        //return this.donnationsRepository.delete({ donnation_id });
    
        try {
            const deleteResult = await this.donnationsRepository.delete({ donnation_id });
        
            if (deleteResult.affected === 1) {
              return 'La Donnation a été supprimée avec succès.';
            } else {
                throw new Error('La Donnation avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Donnation :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Donnation');
          
        }
    }


}
