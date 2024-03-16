import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'lipax',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([User,]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,UsersModule,UsersService],
})
export class AuthModule {}
