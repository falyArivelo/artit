import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event.entity';
import { CreateEventDto } from 'src/events/dtos/CreateEvent.dto';
import { UpdateEventDto } from 'src/events/dtos/UpdateEvent.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
  ) { }

  findEvents() {
    return this.eventsRepository.find({
      relations: [
        'user',
      ]
    })
  }

  findEventById(event_id: number) {
    const events = this.eventsRepository.findOne({
      where: { event_id },
      relations: [
        'user',
      ]
    });

    if (!events) {
      throw new NotFoundException(`Event with ID not found`);
    }

    return events;
  }

  async createEvent(createEventDto: CreateEventDto) {
    try {
      const { event_name, event_start_date, event_end_date, event_price_start, event_description, event_state, user_id, } = createEventDto;
      const newEvent = this.eventsRepository.create({
        event_name,
        event_start_date,
        event_end_date,
        event_price_start,
        event_description,
        event_state,
        user: { user_id: user_id },
      });
      await this.eventsRepository.save(newEvent);
      return 'La  Event a été créée avec succès';
    } catch (error) {
      // Gérez les erreurs spécifiques si nécessaire
      console.error(error.message);
      throw new Error(error.message || 'Une erreur est survenue lors de la création de la Event');
      // throw new NotFoundException('Échec de la création de la Event');
    }
  }

  async updateEvent(event_id: number, updateEventDto: UpdateEventDto) {
    //return this.eventsRepository.update({ event_id }, { ...updateEventDto });
    try {
      const { event_name, event_start_date, event_end_date, event_price_start, event_description, event_state, user_id, } = updateEventDto;
      const updateResult = await this.eventsRepository.update({ event_id }, {
        event_name,
        event_start_date,
        event_end_date,
        event_price_start,
        event_description,
        event_state,
        user: { user_id: user_id },
      });

      if (updateResult.affected > 0) {
        return 'La Event a été mise à jour avec succès.';
      } else {
        throw new Error('La Event avec cet ID n\'existe pas.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la Event :', error);
      throw new Error('Une erreur est survenue lors de la mise à jour de la Event.');
    }
  }

  async deleteEventById(event_id: number) {
    //return this.eventsRepository.delete({ event_id });

    try {
      const deleteResult = await this.eventsRepository.delete({ event_id });

      if (deleteResult.affected === 1) {
        return 'La Event a été supprimée avec succès.';
      } else {
        throw new Error('La Event avec cet ID n\'existe pas.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la Event :', error);
      throw new Error('Une erreur est survenue lors de la suppression de la Event');

    }
  }


}
