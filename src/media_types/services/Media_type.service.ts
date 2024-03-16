import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media_type } from 'src/entities/Media_type.entity';
import { CreateMedia_typeDto } from 'src/media_types/dtos/CreateMedia_type.dto';
import { UpdateMedia_typeDto } from 'src/media_types/dtos/UpdateMedia_type.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Media_typesService {
    constructor(
        @InjectRepository(Media_type) private media_typesRepository: Repository<Media_type>,
    ) { }

    findMedia_types() {
        return this.media_typesRepository.find({relations:[
            ]})
    }

    findMedia_typeById(media_type_id: number) {
        const media_types = this.media_typesRepository.findOne({
           where: { media_type_id },
           relations:[
            ]
            });

        if (!media_types) {
            throw new NotFoundException(`Media_type with ID not found`);
        }

        return media_types;
    }

   async createMedia_type(createMedia_typeDto: CreateMedia_typeDto) {
         try {
        const newMedia_type = this.media_typesRepository.create(createMedia_typeDto);
         await this.media_typesRepository.save(newMedia_type);
         return 'La  Media_type a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Media_type');
            // throw new NotFoundException('Échec de la création de la Media_type');
          }
    }

    async updateMedia_type(media_type_id: number, updateMedia_typeDto: UpdateMedia_typeDto) {
        //return this.media_typesRepository.update({ media_type_id }, { ...updateMedia_typeDto });
            try {
            const updateResult =  await this.media_typesRepository.update({ media_type_id }, { ...updateMedia_typeDto });

            if (updateResult.affected > 0) {
              return 'La Media_type a été mise à jour avec succès.';
            } else {
              throw new Error('La Media_type avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Media_type :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Media_type.');
          }
    }

    async deleteMedia_typeById(media_type_id: number) {
        //return this.media_typesRepository.delete({ media_type_id });
    
        try {
            const deleteResult = await this.media_typesRepository.delete({ media_type_id });
        
            if (deleteResult.affected === 1) {
              return 'La Media_type a été supprimée avec succès.';
            } else {
                throw new Error('La Media_type avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Media_type :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Media_type');
          
        }
    }


}
