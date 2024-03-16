import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Art_type } from 'src/entities/Art_type.entity';
import { CreateArt_typeDto } from 'src/art_types/dtos/CreateArt_type.dto';
import { UpdateArt_typeDto } from 'src/art_types/dtos/UpdateArt_type.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Art_typesService {
    constructor(
        @InjectRepository(Art_type) private art_typesRepository: Repository<Art_type>,
    ) { }

    findArt_types() {
        return this.art_typesRepository.find({relations:[
            ]})
    }

    findArt_typeById(art_type_id: number) {
        const art_types = this.art_typesRepository.findOne({
           where: { art_type_id },
           relations:[
            ]
            });

        if (!art_types) {
            throw new NotFoundException(`Art_type with ID not found`);
        }

        return art_types;
    }

   async createArt_type(createArt_typeDto: CreateArt_typeDto) {
         try {
        const newArt_type = this.art_typesRepository.create(createArt_typeDto);
         await this.art_typesRepository.save(newArt_type);
         return 'La  Art_type a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Art_type');
            // throw new NotFoundException('Échec de la création de la Art_type');
          }
    }

    async updateArt_type(art_type_id: number, updateArt_typeDto: UpdateArt_typeDto) {
        //return this.art_typesRepository.update({ art_type_id }, { ...updateArt_typeDto });
            try {
            const updateResult =  await this.art_typesRepository.update({ art_type_id }, { ...updateArt_typeDto });

            if (updateResult.affected > 0) {
              return 'La Art_type a été mise à jour avec succès.';
            } else {
              throw new Error('La Art_type avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Art_type :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Art_type.');
          }
    }

    async deleteArt_typeById(art_type_id: number) {
        //return this.art_typesRepository.delete({ art_type_id });
    
        try {
            const deleteResult = await this.art_typesRepository.delete({ art_type_id });
        
            if (deleteResult.affected === 1) {
              return 'La Art_type a été supprimée avec succès.';
            } else {
                throw new Error('La Art_type avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Art_type :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Art_type');
          
        }
    }


}
