import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event_detail } from 'src/entities/Event_detail.entity';
import { CreateEvent_detailDto } from 'src/event_details/dtos/CreateEvent_detail.dto';
import { UpdateEvent_detailDto } from 'src/event_details/dtos/UpdateEvent_detail.dto';
import { Repository } from 'typeorm';

@Injectable()
export class Event_detailsService {
    constructor(
        @InjectRepository(Event_detail) private event_detailsRepository: Repository<Event_detail>,
    ) { }

    findEvent_details() {
        return this.event_detailsRepository.find({relations:[
            'event',
            ]})
    }

    findEvent_detailById(event_detail_id: number) {
        const event_details = this.event_detailsRepository.findOne({
           where: { event_detail_id },
           relations:[
            'event',
            ]
            });

        if (!event_details) {
            throw new NotFoundException(`Event_detail with ID not found`);
        }

        return event_details;
    }

   async createEvent_detail(createEvent_detailDto: CreateEvent_detailDto) {
         try {
         const { event_id ,event_price_debut ,} = createEvent_detailDto;
        const newEvent_detail = this.event_detailsRepository.create({
            event_price_debut ,
                event: { event_id: event_id },
          });
         await this.event_detailsRepository.save(newEvent_detail);
         return 'La  Event_detail a été créée avec succès';
        } catch (error) {
            // Gérez les erreurs spécifiques si nécessaire
            console.error(error.message);
            throw new Error(error.message || 'Une erreur est survenue lors de la création de la Event_detail');
            // throw new NotFoundException('Échec de la création de la Event_detail');
          }
    }

    async updateEvent_detail(event_detail_id: number, updateEvent_detailDto: UpdateEvent_detailDto) {
        //return this.event_detailsRepository.update({ event_detail_id }, { ...updateEvent_detailDto });
            try {
            const {event_id ,event_price_debut ,} = updateEvent_detailDto;
            const updateResult = await this.event_detailsRepository.update({ event_detail_id }, { 
                event_price_debut ,
                  event: { event_id: event_id },
             });

            if (updateResult.affected > 0) {
              return 'La Event_detail a été mise à jour avec succès.';
            } else {
              throw new Error('La Event_detail avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la Event_detail :', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de la Event_detail.');
          }
    }

    async deleteEvent_detailById(event_detail_id: number) {
        //return this.event_detailsRepository.delete({ event_detail_id });
    
        try {
            const deleteResult = await this.event_detailsRepository.delete({ event_detail_id });
        
            if (deleteResult.affected === 1) {
              return 'La Event_detail a été supprimée avec succès.';
            } else {
                throw new Error('La Event_detail avec cet ID n\'existe pas.');
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la Event_detail :', error);
            throw new Error('Une erreur est survenue lors de la suppression de la Event_detail');
          
        }
    }


}
