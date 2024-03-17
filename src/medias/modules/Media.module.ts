import { Module } from '@nestjs/common';
import { MediasController } from '../controllers/Media.controller';
import { MediasService } from '../services/Media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Media} from 'src/entities/Media.entity';
import { Media_type } from 'src/entities/Media_type.entity';
import { Media_filesModule } from 'src/media_files/modules/Media_file.module';
import { Media_file } from 'src/entities/Media_file.entity';
import { Media_filesService } from 'src/media_files/services/Media_file.service';
@Module({
  imports:[
    TypeOrmModule.forFeature([Media,]), 
    TypeOrmModule.forFeature([Media_file])
  ],
  controllers: [MediasController,],
  providers: [MediasService,Media_filesModule, Media_filesService]
})
export class MediasModule {}
