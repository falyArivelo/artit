import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enchere_winner } from 'src/entities/Enchere_winner.entity';
import { CreateEnchere_winnerDto } from 'src/enchere_winners/dtos/CreateEnchere_winner.dto';
import { UpdateEnchere_winnerDto } from 'src/enchere_winners/dtos/UpdateEnchere_winner.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Enchere_winnersService {
    constructor(
        @InjectRepository(Enchere_winner) private enchere_winnersRepository: Repository<Enchere_winner>,
    ) { }

    findEnchere_winners() {
        return this.enchere_winnersRepository.find({relations:[
            'user',
            'enchere',
        ]})
    }

    findEnchere_winnerById(enchere_winner_id: number) {
        const enchere_winners = this.enchere_winnersRepository.findOne({
           where: { enchere_winner_id },
           relations:[
            'user',
            'enchere',
            ]
            });

        if (!enchere_winners) {
            throw new NotFoundException(`Enchere_winner with ID not found`);
        }

        return enchere_winners;
    }

   async createEnchere_winner(createEnchere_winnerDto: CreateEnchere_winnerDto) {
         try {
         const { user_id ,enchere_id ,amount ,} = createEnchere_winnerDto;
        const newEnchere_winner = this.enchere_winnersRepository.create({
            amount ,
                user: { user_id: user_id },
                enchere: { enchere_id: enchere_id },
          });
         await this.enchere_winnersRepository.save(newEnchere_winner);
         return 'La  Enchere_winner a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Enchere_winner');
            // throw new NotFoundException('Échec de la création de la Enchere_winner');
          }
    }

    async updateEnchere_winner(enchere_winner_id: number, updateEnchere_winnerDto: UpdateEnchere_winnerDto) {
        //return this.enchere_winnersRepository.update({ enchere_winner_id }, { ...updateEnchere_winnerDto });
            try {
            const {user_id ,enchere_id ,amount ,} = updateEnchere_winnerDto;
            const updateResult = await this.enchere_winnersRepository.update({ enchere_winner_id }, { 
                amount ,
                  user: { user_id: user_id },
                  enchere: { enchere_id: enchere_id },
             });

            if (updateResult.affected > 0) {
              return 'La Enchere_winner a été mise à jour avec succès.';
            } else {
              throw new Error('La Enchere_winner avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Enchere_winner :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Enchere_winner.');
          }
    }

    async deleteEnchere_winnerById(enchere_winner_id: number) {
        //return this.enchere_winnersRepository.delete({ enchere_winner_id });
    
        try {
            const deleteResult = await this.enchere_winnersRepository.delete({ enchere_winner_id });
        
            if (deleteResult.affected === 1) {
              return 'La Enchere_winner a été supprimée avec succès.';
            } else {
                throw new Error('La Enchere_winner avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Enchere_winner :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Enchere_winner');
          
        }
    }


}
