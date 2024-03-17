import { Module } from '@nestjs/common';
import { Exposition_mediasController } from '../controllers/Exposition_media.controller';
import { Exposition_mediasService } from '../services/Exposition_media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Exposition_media} from 'src/entities/Exposition_media.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Exposition_media,])],
  controllers: [Exposition_mediasController,],
  providers: [Exposition_mediasService,]
})
export class Exposition_mediasModule {}
