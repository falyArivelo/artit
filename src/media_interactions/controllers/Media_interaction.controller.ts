import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateMedia_interactionDto } from 'src/media_interactions/dtos/CreateMedia_interaction.dto';
import { UpdateMedia_interactionDto } from 'src/media_interactions/dtos/UpdateMedia_interaction.dto';
import { Media_interactionsService } from 'src/media_interactions/services/Media_interaction.service';

@Controller('media_interactions')
export class Media_interactionsController {
    constructor(private media_interactionsService: Media_interactionsService) { }

    @Get()
    getMedia_interactions() {
        return this.media_interactionsService.findMedia_interactions();
    }

    @Get(':id')
    getMedia_interaction(@Param('id') id: number) {
        return this.media_interactionsService.findMedia_interactionById(id);
    }

    @Post()
    async createMedia_interaction(@Body() createMedia_interactionDto: CreateMedia_interactionDto) {
        //this.media_interactionsService.createMedia_interaction(createMedia_interactionDto);
        try {
            const message = await this.media_interactionsService.createMedia_interaction(createMedia_interactionDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Media_interaction' };
        }
    }

    @Put(':id')
    async updateMedia_interaction(@Param('id') id: number, @Body() updateMedia_interactionDto: UpdateMedia_interactionDto) {
       // await this.media_interactionsService.updateMedia_interaction(id, updateMedia_interactionDto)
        try {
            const message = await this.media_interactionsService.updateMedia_interaction(id, updateMedia_interactionDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteMedia_interactionById(@Param('id', ParseIntPipe) id: number) {
        //await this.media_interactionsService.deleteMedia_interactionById(id);
        try {
            const message = await this.media_interactionsService.deleteMedia_interactionById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
