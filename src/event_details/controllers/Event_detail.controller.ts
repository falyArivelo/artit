import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateEvent_detailDto } from 'src/event_details/dtos/CreateEvent_detail.dto';
import { UpdateEvent_detailDto } from 'src/event_details/dtos/UpdateEvent_detail.dto';
import { Event_detailsService } from 'src/event_details/services/Event_detail.service';

@Controller('event_details')
export class Event_detailsController {
    constructor(private event_detailsService: Event_detailsService) { }

    @Get()
    getEvent_details() {
        return this.event_detailsService.findEvent_details();
    }

    @Get(':id')
    getEvent_detail(@Param('id') id: number) {
        return this.event_detailsService.findEvent_detailById(id);
    }

    @Post()
    async createEvent_detail(@Body() createEvent_detailDto: CreateEvent_detailDto) {
        //this.event_detailsService.createEvent_detail(createEvent_detailDto);
        try {
            const message = await this.event_detailsService.createEvent_detail(createEvent_detailDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Event_detail' };
        }
    }

    @Put(':id')
    async updateEvent_detail(@Param('id') id: number, @Body() updateEvent_detailDto: UpdateEvent_detailDto) {
       // await this.event_detailsService.updateEvent_detail(id, updateEvent_detailDto)
        try {
            const message = await this.event_detailsService.updateEvent_detail(id, updateEvent_detailDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteEvent_detailById(@Param('id', ParseIntPipe) id: number) {
        //await this.event_detailsService.deleteEvent_detailById(id);
        try {
            const message = await this.event_detailsService.deleteEvent_detailById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
