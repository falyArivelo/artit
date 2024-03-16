import { Module } from '@nestjs/common';
import { Media_typesController } from '../controllers/Media_type.controller';
import { Media_typesService } from '../services/Media_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Media_type} from 'src/entities/Media_type.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Media_type,])],
  controllers: [Media_typesController,],
  providers: [Media_typesService,]
})
export class Media_typesModule {}
