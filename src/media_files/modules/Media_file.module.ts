import { Module } from '@nestjs/common';
import { Media_filesController } from '../controllers/Media_file.controller';
import { Media_filesService } from '../services/Media_file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Media_file} from 'src/entities/Media_file.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Media_file,])],
  controllers: [Media_filesController,],
  providers: [Media_filesService,]
})
export class Media_filesModule {}
