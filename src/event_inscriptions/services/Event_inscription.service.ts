import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event_inscription } from 'src/entities/Event_inscription.entity';
import { CreateEvent_inscriptionDto } from 'src/event_inscriptions/dtos/CreateEvent_inscription.dto';
import { UpdateEvent_inscriptionDto } from 'src/event_inscriptions/dtos/UpdateEvent_inscription.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Event_inscriptionsService {
    constructor(
        @InjectRepository(Event_inscription) private event_inscriptionsRepository: Repository<Event_inscription>,
    ) { }

    findEvent_inscriptions() {
        return this.event_inscriptionsRepository.find({relations:[
            'user',
            ]})
    }

    findEvent_inscriptionById(event_inscription_id: number) {
        const event_inscriptions = this.event_inscriptionsRepository.findOne({
           where: { event_inscription_id },
           relations:[
            'user',
            ]
            });

        if (!event_inscriptions) {
            throw new NotFoundException(`Event_inscription with ID not found`);
        }

        return event_inscriptions;
    }

   async createEvent_inscription(createEvent_inscriptionDto: CreateEvent_inscriptionDto) {
         try {
         const { user_id ,event_inscription_date ,event_inscription_state ,} = createEvent_inscriptionDto;
        const newEvent_inscription = this.event_inscriptionsRepository.create({
            event_inscription_date ,
            event_inscription_state ,
                user: { user_id: user_id },
          });
         await this.event_inscriptionsRepository.save(newEvent_inscription);
         return 'La  Event_inscription a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Event_inscription');
            // throw new NotFoundException('Échec de la création de la Event_inscription');
          }
    }

    async updateEvent_inscription(event_inscription_id: number, updateEvent_inscriptionDto: UpdateEvent_inscriptionDto) {
        //return this.event_inscriptionsRepository.update({ event_inscription_id }, { ...updateEvent_inscriptionDto });
            try {
            const {user_id ,event_inscription_date ,event_inscription_state ,} = updateEvent_inscriptionDto;
            const updateResult = await this.event_inscriptionsRepository.update({ event_inscription_id }, { 
                event_inscription_date ,
                event_inscription_state ,
                  user: { user_id: user_id },
             });

            if (updateResult.affected > 0) {
              return 'La Event_inscription a été mise à jour avec succès.';
            } else {
              throw new Error('La Event_inscription avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Event_inscription :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Event_inscription.');
          }
    }

    async deleteEvent_inscriptionById(event_inscription_id: number) {
        //return this.event_inscriptionsRepository.delete({ event_inscription_id });
    
        try {
            const deleteResult = await this.event_inscriptionsRepository.delete({ event_inscription_id });
        
            if (deleteResult.affected === 1) {
              return 'La Event_inscription a été supprimée avec succès.';
            } else {
                throw new Error('La Event_inscription avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Event_inscription :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Event_inscription');
          
        }
    }


}
