import { Module } from '@nestjs/common';
import { ProfilsController } from '../controllers/Profil.controller';
import { ProfilsService } from '../services/Profil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Profil} from 'src/entities/Profil.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Profil,])],
  controllers: [ProfilsController,],
  providers: [ProfilsService,]
})
export class ProfilsModule {}
