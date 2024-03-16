import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users/users.service';

const fakeUsers = [
  {
    id: 1,
    email: 'anson',
    password: 'password',
  },
  {
    id: 2,
    email: 'jack',
    password: 'password123',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) { }

  // Méthode pour générer un JWT
  generateToken(userId: number): string {
    return this.jwtService.sign({ userId: userId });
  }

  // Méthode pour vérifier et décoder un JWT
  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user.user_id);
    return { token };
  }

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.email === email);
    //const findUser = await this.userService.findByEmail(email)
    if (!findUser) return null;
    if (password === findUser.password) {
      console.log("loged")
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }

  }
}
