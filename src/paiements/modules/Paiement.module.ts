import { Module } from '@nestjs/common';
import { PaiementsController } from '../controllers/Paiement.controller';
import { PaiementsService } from '../services/Paiement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Paiement} from 'src/entities/Paiement.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Paiement,])],
  controllers: [PaiementsController,],
  providers: [PaiementsService,]
})
export class PaiementsModule {}
