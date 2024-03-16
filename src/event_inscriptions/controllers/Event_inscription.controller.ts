import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateEvent_inscriptionDto } from 'src/event_inscriptions/dtos/CreateEvent_inscription.dto';
import { UpdateEvent_inscriptionDto } from 'src/event_inscriptions/dtos/UpdateEvent_inscription.dto';
import { Event_inscriptionsService } from 'src/event_inscriptions/services/Event_inscription.service';

@Controller('event_inscriptions')
export class Event_inscriptionsController {
    constructor(private event_inscriptionsService: Event_inscriptionsService) { }

    @Get()
    getEvent_inscriptions() {
        return this.event_inscriptionsService.findEvent_inscriptions();
    }

    @Get(':id')
    getEvent_inscription(@Param('id') id: number) {
        return this.event_inscriptionsService.findEvent_inscriptionById(id);
    }

    @Post()
    async createEvent_inscription(@Body() createEvent_inscriptionDto: CreateEvent_inscriptionDto) {
        //this.event_inscriptionsService.createEvent_inscription(createEvent_inscriptionDto);
        try {
            const message = await this.event_inscriptionsService.createEvent_inscription(createEvent_inscriptionDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Event_inscription' };
        }
    }

    @Put(':id')
    async updateEvent_inscription(@Param('id') id: number, @Body() updateEvent_inscriptionDto: UpdateEvent_inscriptionDto) {
       // await this.event_inscriptionsService.updateEvent_inscription(id, updateEvent_inscriptionDto)
        try {
            const message = await this.event_inscriptionsService.updateEvent_inscription(id, updateEvent_inscriptionDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteEvent_inscriptionById(@Param('id', ParseIntPipe) id: number) {
        //await this.event_inscriptionsService.deleteEvent_inscriptionById(id);
        try {
            const message = await this.event_inscriptionsService.deleteEvent_inscriptionById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
