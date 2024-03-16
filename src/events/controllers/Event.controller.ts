import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateEventDto } from 'src/events/dtos/CreateEvent.dto';
import { UpdateEventDto } from 'src/events/dtos/UpdateEvent.dto';
import { EventsService } from 'src/events/services/Event.service';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) { }

    @Get()
    getEvents() {
        return this.eventsService.findEvents();
    }

    @Get(':id')
    getEvent(@Param('id') id: number) {
        return this.eventsService.findEventById(id);
    }

    @Post()
    async createEvent(@Body() createEventDto: CreateEventDto) {
        //this.eventsService.createEvent(createEventDto);
        try {
            const message = await this.eventsService.createEvent(createEventDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Event' };
        }
    }

    @Put(':id')
    async updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
       // await this.eventsService.updateEvent(id, updateEventDto)
        try {
            const message = await this.eventsService.updateEvent(id, updateEventDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteEventById(@Param('id', ParseIntPipe) id: number) {
        //await this.eventsService.deleteEventById(id);
        try {
            const message = await this.eventsService.deleteEventById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
