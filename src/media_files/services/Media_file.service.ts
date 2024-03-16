import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media_file } from 'src/entities/Media_file.entity';
import { CreateMedia_fileDto } from 'src/media_files/dtos/CreateMedia_file.dto';
import { UpdateMedia_fileDto } from 'src/media_files/dtos/UpdateMedia_file.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Media_filesService {
    constructor(
        @InjectRepository(Media_file) private media_filesRepository: Repository<Media_file>,
    ) { }

    findMedia_files() {
        return this.media_filesRepository.find({relations:[
            'media',
            ]})
    }

    findMedia_fileById(media_file_id: number) {
        const media_files = this.media_filesRepository.findOne({
           where: { media_file_id },
           relations:[
            'media',
            ]
            });

        if (!media_files) {
            throw new NotFoundException(`Media_file with ID not found`);
        }

        return media_files;
    }

   async createMedia_file(createMedia_fileDto: CreateMedia_fileDto) {
         try {
         const { media_id ,media_file_data ,} = createMedia_fileDto;
        const newMedia_file = this.media_filesRepository.create({
            media_file_data ,
                media: { media_id: media_id },
          });
         await this.media_filesRepository.save(newMedia_file);
         return 'La  Media_file a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Media_file');
            // throw new NotFoundException('Échec de la création de la Media_file');
          }
    }

    async updateMedia_file(media_file_id: number, updateMedia_fileDto: UpdateMedia_fileDto) {
        //return this.media_filesRepository.update({ media_file_id }, { ...updateMedia_fileDto });
            try {
            const {media_id ,media_file_data ,} = updateMedia_fileDto;
            const updateResult = await this.media_filesRepository.update({ media_file_id }, { 
                media_file_data ,
                  media: { media_id: media_id },
             });

            if (updateResult.affected > 0) {
              return 'La Media_file a été mise à jour avec succès.';
            } else {
              throw new Error('La Media_file avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Media_file :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Media_file.');
          }
    }

    async deleteMedia_fileById(media_file_id: number) {
        //return this.media_filesRepository.delete({ media_file_id });
    
        try {
            const deleteResult = await this.media_filesRepository.delete({ media_file_id });
        
            if (deleteResult.affected === 1) {
              return 'La Media_file a été supprimée avec succès.';
            } else {
                throw new Error('La Media_file avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Media_file :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Media_file');
          
        }
    }


}
