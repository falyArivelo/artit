import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/User.controller';
import { UsersService } from '../services/User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from 'src/entities/User.entity';
@Module({
  imports:[TypeOrmModule.forFeature([User,])],
  controllers: [UsersController,],
  providers: [UsersService,]
})
export class UsersModule {}
