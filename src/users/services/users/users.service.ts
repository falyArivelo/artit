import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    findUsers() {
        return this.userRepository.find({
            relations: [
                'profil',
            ]
        })
    }

    findUserById(user_id: number) {
        const user = this.userRepository.findOne({
            where: { user_id }, relations: [
                'profil',
            ]
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found`);
        }

        return user;
    }

    async findByEmail(email: string) {
        // const user = this.userRepository.findOne({ where: { email } });
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        try {
            const {
                name,
                gender,
                password,
                birth,
                email,
                profil_id
            } = createUserDto;

            // const newUser = this.userRepository.create(createUserDto);
            const newUser = this.userRepository.create({
                name,
                gender,
                password,
                birth,
                email,
                profil: { profil_id: profil_id }
            });

            this.userRepository.save(newUser);
            return 'Inscription reussie ! ';
        } catch (error) {
            console.error(error.message);
            throw new Error('Inscription erreur !');
        }

    }


    updateUser(user_id: number, updateUserDto: UpdateUserDto) {
        try {

            const {
                name,
                gender,
                password,
                birth,
                email,
                profil_id
            } = updateUserDto;

            this.userRepository.update({ user_id }, {
                name,
                gender,
                password,
                birth,
                email,
                profil: { profil_id: profil_id }
            });
            return 'modification reussie  ! ';

        } catch (error) {
            console.error(error.message);
            throw new Error('modification user erreur !');
        }
    }

    async deleteUSerById(user_id: number) {
        try {
            await this.userRepository.delete({ user_id });
            return 'suppression  reussie ! ';

        } catch (error) {
            throw new Error('suppression user erreur !');
        }
    }


}
