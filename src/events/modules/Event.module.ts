import { Module } from '@nestjs/common';
import { EventsController } from '../controllers/Event.controller';
import { EventsService } from '../services/Event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Event} from 'src/entities/Event.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Event,])],
  controllers: [EventsController,],
  providers: [EventsService,]
})
export class EventsModule {}
