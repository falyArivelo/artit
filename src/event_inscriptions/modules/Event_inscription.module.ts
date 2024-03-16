import { Module } from '@nestjs/common';
import { Event_inscriptionsController } from '../controllers/Event_inscription.controller';
import { Event_inscriptionsService } from '../services/Event_inscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Event_inscription} from 'src/entities/Event_inscription.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Event_inscription,])],
  controllers: [Event_inscriptionsController,],
  providers: [Event_inscriptionsService,]
})
export class Event_inscriptionsModule {}
