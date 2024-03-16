import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profil } from 'src/entities/Profil.entity';
import { CreateProfilDto } from 'src/profils/dtos/CreateProfil.dto';
import { UpdateProfilDto } from 'src/profils/dtos/UpdateProfil.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilsService {
    constructor(
        @InjectRepository(Profil) private profilsRepository: Repository<Profil>,
    ) { }

    findProfils() {
        return this.profilsRepository.find({relations:[
            ]})
    }

    findProfilById(profil_id: number) {
        const profils = this.profilsRepository.findOne({
           where: { profil_id },
           relations:[
            ]
            });

        if (!profils) {
            throw new NotFoundException(`Profil with ID not found`);
        }

        return profils;
    }

   async createProfil(createProfilDto: CreateProfilDto) {
         try {
        const newProfil = this.profilsRepository.create(createProfilDto);
         await this.profilsRepository.save(newProfil);
         return 'La  Profil a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Profil');
            // throw new NotFoundException('Échec de la création de la Profil');
          }
    }

    async updateProfil(profil_id: number, updateProfilDto: UpdateProfilDto) {
        //return this.profilsRepository.update({ profil_id }, { ...updateProfilDto });
            try {
            const updateResult =  await this.profilsRepository.update({ profil_id }, { ...updateProfilDto });

            if (updateResult.affected > 0) {
              return 'La Profil a été mise à jour avec succès.';
            } else {
              throw new Error('La Profil avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Profil :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Profil.');
          }
    }

    async deleteProfilById(profil_id: number) {
        //return this.profilsRepository.delete({ profil_id });
    
        try {
            const deleteResult = await this.profilsRepository.delete({ profil_id });
        
            if (deleteResult.affected === 1) {
              return 'La Profil a été supprimée avec succès.';
            } else {
                throw new Error('La Profil avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Profil :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Profil');
          
        }
    }


}
