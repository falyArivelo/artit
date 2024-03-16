import { Module } from '@nestjs/common';
import { Event_detailsController } from '../controllers/Event_detail.controller';
import { Event_detailsService } from '../services/Event_detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Event_detail} from 'src/entities/Event_detail.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Event_detail,])],
  controllers: [Event_detailsController,],
  providers: [Event_detailsService,]
})
export class Event_detailsModule {}
