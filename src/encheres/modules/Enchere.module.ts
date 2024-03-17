import { Module } from '@nestjs/common';
import { EncheresController } from '../controllers/Enchere.controller';
import { EncheresService } from '../services/Enchere.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Enchere} from 'src/entities/Enchere.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Enchere,])],
  controllers: [EncheresController,],
  providers: [EncheresService,]
})
export class EncheresModule {}
