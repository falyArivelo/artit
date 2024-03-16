import { Module } from '@nestjs/common';
import { MediasController } from '../controllers/Media.controller';
import { MediasService } from '../services/Media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Media} from 'src/entities/Media.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Media,])],
  controllers: [MediasController,],
  providers: [MediasService,]
})
export class MediasModule {}
