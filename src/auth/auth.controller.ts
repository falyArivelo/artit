import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthPayloadDto, LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { token, user } = await this.authService.login(loginDto);
      if (token) {
        return {
          success: true,
          message: 'login successful',
          data: {
            token: token,
            data: user,
          },
        };
      }
      return {
        success: false,
        message: "erreur d'authentification",
        token: null,
      };
    } catch (error) {
      return { success: false, message: error.message, token: null };
    }
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
    console.log(req.user);
    return req.user;
  }

  @Post('checkGmail')
  async check(@Body('email') email: string) {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        // throw new NotFoundException(`User with email ${email} not found`);
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
