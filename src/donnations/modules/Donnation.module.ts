import { Module } from '@nestjs/common';
import { DonnationsController } from '../controllers/Donnation.controller';
import { DonnationsService } from '../services/Donnation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Donnation} from 'src/entities/Donnation.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Donnation,])],
  controllers: [DonnationsController,],
  providers: [DonnationsService,]
})
export class DonnationsModule {}
