import { Module } from '@nestjs/common';
import { Art_typesController } from '../controllers/Art_type.controller';
import { Art_typesService } from '../services/Art_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Art_type} from 'src/entities/Art_type.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Art_type,])],
  controllers: [Art_typesController,],
  providers: [Art_typesService,]
})
export class Art_typesModule {}
