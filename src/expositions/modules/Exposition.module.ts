import { Module } from '@nestjs/common';
import { ExpositionsController } from '../controllers/Exposition.controller';
import { ExpositionsService } from '../services/Exposition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Exposition} from 'src/entities/Exposition.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Exposition,])],
  controllers: [ExpositionsController,],
  providers: [ExpositionsService,]
})
export class ExpositionsModule {}
