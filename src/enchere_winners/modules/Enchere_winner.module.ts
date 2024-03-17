import { Module } from '@nestjs/common';
import { Enchere_winnersController } from '../controllers/Enchere_winner.controller';
import { Enchere_winnersService } from '../services/Enchere_winner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Enchere_winner} from 'src/entities/Enchere_winner.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Enchere_winner,])],
  controllers: [Enchere_winnersController,],
  providers: [Enchere_winnersService,]
})
export class Enchere_winnersModule {}
