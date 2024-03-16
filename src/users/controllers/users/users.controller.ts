import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    getUsers() {
        return this.userService.findUsers();
    }

    @Get(':id')
    get(@Param('id') id: number) {
        try {
            return this.userService.findUserById(id);
        } catch (error) {
        }
    }
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const message = this.userService.createUser(createUserDto);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Dechet' };

        }
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        try {
            const message = this.userService.updateUser(id, updateUserDto)
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        try {
            const message = await this.userService.deleteUSerById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
