import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { CreateMediaDto } from 'src/medias/dtos/CreateMedia.dto';
import { UpdateMediaDto } from 'src/medias/dtos/UpdateMedia.dto';
import { Repository, Transaction } from 'typeorm';
import { UploadMediaDto } from '../dtos/UploadMedia.dto';
import { Media_file } from 'src/entities/Media_file.entity';
import { promises as fs } from 'fs';
import { getMediaFiles } from 'src/helper/file.helper';

@Injectable()
export class MediasService {
    constructor(
        @InjectRepository(Media) private mediasRepository: Repository<Media>,
        @InjectRepository(Media_file) private mediaFileRepository: Repository<Media_file>,
    ) {  }

    async getMediaFiles(files: File[]) {
      var medias: Media_file[] = [];
      for (let img of files) {
          
          const mediaFileData = new Uint8Array();//await this.convertFileToByte(img);
          let file: Media_file = new Media_file();
          //file.media_file_data = mediaFileData;
          medias.push(file);
      }
      return medias;
    } 

   convertFileToByte(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
            const byteArray = new Uint8Array(fileReader.result as ArrayBuffer);
            resolve(byteArray);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
  }
  
  async processSavingMedia(mediaDto: UploadMediaDto, files: File[]){
      var mediaFiles : Media_file[] = await getMediaFiles(files);
      try {
        const { media_source ,media_name ,media_ia_descriptor ,media_key_word ,user_id ,art_type_id ,media_type_id ,} = mediaDto;
        const newMedia = this.mediasRepository.create({
          media_source,
          media_name,
          media_ia_descriptor,
          media_key_word,
          user: { user_id: user_id },
          art_type: { art_type_id: art_type_id },
          media_type: { media_type_id: media_type_id },
        });
        console.log("savee");
        await this.mediasRepository.save(newMedia);
        console.log("dqsdd")
        for(let mediaFile of mediaFiles){
            mediaFile.media = newMedia;
            await this.mediaFileRepository.save(mediaFile);
        }
        return 'La  Media a été créée avec succès';
       } catch (error) {
           // Gérez les erreurs spécifiques si nécessaire
           console.error(error.message);
           throw new Error(error.message);
           // throw new NotFoundException('Échec de la création de la Media');
         }
    }

    findMedias() {
        return this.mediasRepository.find({relations:[
            'user',
            'art_type',
            'media_type',
            ]})
    }

    findMediaById(media_id: number) {
        const medias = this.mediasRepository.findOne({
           where: { media_id },
           relations:[
            'user',
            'art_type',
            'media_type',
            ]
            });

        if (!medias) {
            throw new NotFoundException(`Media with ID not found`);
        }
        return medias;
    }

   async createMedia(createMediaDto: CreateMediaDto) {
         try {
         const { media_source ,media_name ,media_ia_descriptor ,media_key_word ,user_id ,art_type_id ,media_type_id ,} = createMediaDto;
        const newMedia = this.mediasRepository.create({
            media_source ,
            media_name ,
            media_ia_descriptor ,
            media_key_word ,
                user: { user_id: user_id },
                art_type: { art_type_id: art_type_id },
                media_type: { media_type_id: media_type_id },
          });
         await this.mediasRepository.save(newMedia);
         return 'La  Media a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Media');
            // throw new NotFoundException('Échec de la création de la Media');
          }
    }

    async updateMedia(media_id: number, updateMediaDto: UpdateMediaDto) {
        //return this.mediasRepository.update({ media_id }, { ...updateMediaDto });
            try {
            const {media_source ,media_name ,media_ia_descriptor ,media_key_word ,user_id ,art_type_id ,media_type_id ,} = updateMediaDto;
            const updateResult = await this.mediasRepository.update({ media_id }, { 
                media_source ,
                media_name ,
                media_ia_descriptor ,
                media_key_word ,
                  user: { user_id: user_id },
                  art_type: { art_type_id: art_type_id },
                  media_type: { media_type_id: media_type_id },
             });

            if (updateResult.affected > 0) {
              return 'La Media a été mise à jour avec succès.';
            } else {
              throw new Error('La Media avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Media :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Media.');
          }
    }

    async deleteMediaById(media_id: number) {
        //return this.mediasRepository.delete({ media_id });
    
        try {
            const deleteResult = await this.mediasRepository.delete({ media_id });
        
            if (deleteResult.affected === 1) {
              return 'La Media a été supprimée avec succès.';
            } else {
                throw new Error('La Media avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Media :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Media');
          
        }
    }


}
