import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateExposition_mediaDto } from 'src/exposition_medias/dtos/CreateExposition_media.dto';
import { UpdateExposition_mediaDto } from 'src/exposition_medias/dtos/UpdateExposition_media.dto';
import { Exposition_mediasService } from 'src/exposition_medias/services/Exposition_media.service';

@Controller('exposition_medias')
export class Exposition_mediasController {
    constructor(private exposition_mediasService: Exposition_mediasService) { }

    @Get()
    getExposition_medias() {
        return this.exposition_mediasService.findExposition_medias();
    }

    @Get(':id')
    getExposition_media(@Param('id') id: number) {
        return this.exposition_mediasService.findExposition_mediaById(id);
    }

    @Post()
    async createExposition_media(@Body() createExposition_mediaDto: CreateExposition_mediaDto) {
        //this.exposition_mediasService.createExposition_media(createExposition_mediaDto);
        try {
            const message = await this.exposition_mediasService.createExposition_media(createExposition_mediaDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Exposition_media' };
        }
    }

    @Put(':id')
    async updateExposition_media(@Param('id') id: number, @Body() updateExposition_mediaDto: UpdateExposition_mediaDto) {
       // await this.exposition_mediasService.updateExposition_media(id, updateExposition_mediaDto)
        try {
            const message = await this.exposition_mediasService.updateExposition_media(id, updateExposition_mediaDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteExposition_mediaById(@Param('id', ParseIntPipe) id: number) {
        //await this.exposition_mediasService.deleteExposition_mediaById(id);
        try {
            const message = await this.exposition_mediasService.deleteExposition_mediaById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
