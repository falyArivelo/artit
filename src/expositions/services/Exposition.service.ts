import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exposition } from 'src/entities/Exposition.entity';
import { CreateExpositionDto } from 'src/expositions/dtos/CreateExposition.dto';
import { UpdateExpositionDto } from 'src/expositions/dtos/UpdateExposition.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ExpositionsService {
    constructor(
        @InjectRepository(Exposition) private expositionsRepository: Repository<Exposition>,
    ) { }

    findExpositions() {
        return this.expositionsRepository.find({relations:[
            ]})
    }

    findExpositionById(exposition_id: number) {
        const expositions = this.expositionsRepository.findOne({
           where: { exposition_id },
           relations:[
            ]
            });

        if (!expositions) {
            throw new NotFoundException(`Exposition with ID not found`);
        }

        return expositions;
    }

   async createExposition(createExpositionDto: CreateExpositionDto) {
         try {
        const newExposition = this.expositionsRepository.create(createExpositionDto);
         await this.expositionsRepository.save(newExposition);
         return 'La  Exposition a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Exposition');
            // throw new NotFoundException('Échec de la création de la Exposition');
          }
    }

    async updateExposition(exposition_id: number, updateExpositionDto: UpdateExpositionDto) {
        //return this.expositionsRepository.update({ exposition_id }, { ...updateExpositionDto });
            try {
            const updateResult =  await this.expositionsRepository.update({ exposition_id }, { ...updateExpositionDto });

            if (updateResult.affected > 0) {
              return 'La Exposition a été mise à jour avec succès.';
            } else {
              throw new Error('La Exposition avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Exposition :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Exposition.');
          }
    }

    async deleteExpositionById(exposition_id: number) {
        //return this.expositionsRepository.delete({ exposition_id });
    
        try {
            const deleteResult = await this.expositionsRepository.delete({ exposition_id });
        
            if (deleteResult.affected === 1) {
              return 'La Exposition a été supprimée avec succès.';
            } else {
                throw new Error('La Exposition avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Exposition :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Exposition');
          
        }
    }


}
