import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { CreateMediaDto } from 'src/medias/dtos/CreateMedia.dto';
import { UpdateMediaDto } from 'src/medias/dtos/UpdateMedia.dto';
import { Any, Repository, Transaction } from 'typeorm';
import { UploadMediaDto } from '../dtos/UploadMedia.dto';
import { Media_file } from 'src/entities/Media_file.entity';
import { promises as fs } from 'fs';
import { getMediaFiles } from 'src/helper/file.helper';
import { Media_filesService } from 'src/media_files/services/Media_file.service';
import { User_historique } from 'src/entities/User_historique.entity';
import axios from 'axios';
import { json } from 'stream/consumers';

@Injectable()
export class MediasService {
    constructor(
        @InjectRepository(Media) private mediasRepository: Repository<Media>,
        @InjectRepository(Media_file) private mediaFileRepository: Repository<Media_file>,
        private mediaFileService: Media_filesService,
        @InjectRepository(User_historique) private user_historiqueRepository: Repository<User_historique>
    ) {  }

  convertMediaArrayToFormatToTrain(medias: Media[]){
    var textToTrain = {};
    for(let media of medias){
      textToTrain [media.media_id + 'MED'] = media.media_ia_descriptor;
    }
    return textToTrain;
  }

  async processFetchUserPreferedMedia(user_id: number) {
    const last_search : User_historique = await this.user_historiqueRepository.findOne({where: {user_id}, order: {date: 'DESC'}});
    const text = last_search.last_search;
    const sorted_media : Media[] = await this.mediasRepository.find();
    const textToTrain = this.convertMediaArrayToFormatToTrain(sorted_media);
    textToTrain["target"] = text;
    console.log("textToTrain ", textToTrain);
    const data = { 
      "texts": textToTrain
    }
    const result: any = await axios.post("http://192.168.1.11:1115/clustering", data)
    console.log("result ", result.data.result);
    const valid_index = result.data.result;
    const valid_medias_index = [];
    for(let i = 0; i< valid_index.length; i++){
      valid_medias_index.push(parseInt(valid_index[i].replace("MED", "")));
    }
    console.log("valid_medias_index ", valid_medias_index);
    const valid_medias = this.sortMediaByValidIndex(sorted_media, valid_medias_index);
    await this.fetchMediaFiles(valid_medias);
    return valid_medias;
  }
  
  sortMediaByValidIndex(sorted_media, valid_medias_index) {
    return sorted_media.sort((a, b) => {
       const indexA = valid_medias_index.indexOf(a.media_id);
       const indexB = valid_medias_index.indexOf(b.media_id);
   
       // Si a.media_id n'est pas dans valid_medias_index, on le place à la fin
       if (indexA === -1) return 1;
       if (indexB === -1) return -1;
   
       // Sinon, on trie selon l'ordre dans valid_medias_index
       return indexA - indexB;
    });
   }

  async processSavingMedia(mediaDto: UploadMediaDto, files: File[]){
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
        await this.mediasRepository.save(newMedia);
        const fs = require("fs");
        for(let file of files){
          let fileAny: any = file;
          console.log("file ", fileAny);
          const mediaFile = new Media_file();
          mediaFile.media = newMedia;
          const fileBuffer = fs.readFileSync(fileAny.path);
          const base64String = fileBuffer.toString('base64');
          mediaFile.media_file_data = base64String// base64
          await this.mediaFileRepository.save(mediaFile);
        }
        return 'La  Media a été créée avec succès';
       } catch (error) {
           console.error(error.message);
           throw new Error(error.message);
         }
    }

    async findMedias() {
        var medias: Media[] = await this.mediasRepository.find({relations:[
          'user',
          'art_type',
          'media_type',
          ]})
        await this.fetchMediaFiles(medias);
        return { "medias" : medias}
    }

    async fetchMediaFiles(medias: Media[]){
      for(var media of medias){
        media.file = await this.mediaFileService.findMedia_files_by_media(media.media_id);
      }
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
