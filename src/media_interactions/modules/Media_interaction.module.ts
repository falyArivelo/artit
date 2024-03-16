import { Module } from '@nestjs/common';
import { Media_interactionsController } from '../controllers/Media_interaction.controller';
import { Media_interactionsService } from '../services/Media_interaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Media_interaction} from 'src/entities/Media_interaction.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Media_interaction,])],
  controllers: [Media_interactionsController,],
  providers: [Media_interactionsService,]
})
export class Media_interactionsModule {}
