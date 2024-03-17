import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from '../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    //this.usersService.createUser(createUserDto);
    try {
      const message = await this.usersService.createUser(createUserDto);
      return { success: true, message };
    } catch (error) {
      return {
        success: false,
        message:
          error.message ||
          'Une erreur est survenue lors de la création de la User',
      };
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // await this.usersService.updateUser(id, updateUserDto)
    try {
      const message = await this.usersService.updateUser(id, updateUserDto);
      return { success: true, message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    //await this.usersService.deleteUserById(id);
    try {
      const message = await this.usersService.deleteUSerById(id);
      return { success: true, message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
