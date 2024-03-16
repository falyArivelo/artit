import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paiement } from 'src/entities/Paiement.entity';
import { CreatePaiementDto } from 'src/paiements/dtos/CreatePaiement.dto';
import { UpdatePaiementDto } from 'src/paiements/dtos/UpdatePaiement.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PaiementsService {
    constructor(
        @InjectRepository(Paiement) private paiementsRepository: Repository<Paiement>,
    ) { }

    findPaiements() {
        return this.paiementsRepository.find({relations:[
            ]})
    }

    findPaiementById(paiement_id: number) {
        const paiements = this.paiementsRepository.findOne({
           where: { paiement_id },
           relations:[
            ]
            });

        if (!paiements) {
            throw new NotFoundException(`Paiement with ID not found`);
        }

        return paiements;
    }

   async createPaiement(createPaiementDto: CreatePaiementDto) {
         try {
        const newPaiement = this.paiementsRepository.create(createPaiementDto);
         await this.paiementsRepository.save(newPaiement);
         return 'La  Paiement a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Paiement');
            // throw new NotFoundException('Échec de la création de la Paiement');
          }
    }

    async updatePaiement(paiement_id: number, updatePaiementDto: UpdatePaiementDto) {
        //return this.paiementsRepository.update({ paiement_id }, { ...updatePaiementDto });
            try {
            const updateResult =  await this.paiementsRepository.update({ paiement_id }, { ...updatePaiementDto });

            if (updateResult.affected > 0) {
              return 'La Paiement a été mise à jour avec succès.';
            } else {
              throw new Error('La Paiement avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Paiement :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Paiement.');
          }
    }

    async deletePaiementById(paiement_id: number) {
        //return this.paiementsRepository.delete({ paiement_id });
    
        try {
            const deleteResult = await this.paiementsRepository.delete({ paiement_id });
        
            if (deleteResult.affected === 1) {
              return 'La Paiement a été supprimée avec succès.';
            } else {
                throw new Error('La Paiement avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Paiement :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Paiement');
          
        }
    }


}
