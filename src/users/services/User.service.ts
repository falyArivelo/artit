import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

    findUsers() {
        return this.usersRepository.find({relations:[
            'profil',
            ]})
    }

    findUserById(user_id: number) {
        const users = this.usersRepository.findOne({
           where: { user_id },
           relations:[
            'profil',
            ]
            });

        if (!users) {
            throw new NotFoundException(`User with ID not found`);
        }

        return users;
    }

   async createUser(createUserDto: CreateUserDto) {
         try {
         const { user_name ,user_password ,user_birth ,user_email ,profil_id ,} = createUserDto;
        const newUser = this.usersRepository.create({
            user_name ,
            user_password ,
            user_birth ,
            user_email ,
                profil: { profil_id: profil_id },
          });
         await this.usersRepository.save(newUser);
         return 'La  User a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la User');
            // throw new NotFoundException('Échec de la création de la User');
          }
    }

    async updateUser(user_id: number, updateUserDto: UpdateUserDto) {
        //return this.usersRepository.update({ user_id }, { ...updateUserDto });
            try {
            const {user_name ,user_password ,user_birth ,user_email ,profil_id ,} = updateUserDto;
            const updateResult = await this.usersRepository.update({ user_id }, { 
                user_name ,
                user_password ,
                user_birth ,
                user_email ,
                  profil: { profil_id: profil_id },
             });

            if (updateResult.affected > 0) {
              return 'La User a été mise à jour avec succès.';
            } else {
              throw new Error('La User avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la User :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la User.');
          }
    }

    async deleteUserById(user_id: number) {
        //return this.usersRepository.delete({ user_id });
    
        try {
            const deleteResult = await this.usersRepository.delete({ user_id });
        
            if (deleteResult.affected === 1) {
              return 'La User a été supprimée avec succès.';
            } else {
                throw new Error('La User avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la User :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la User');
          
        }
    }


}
