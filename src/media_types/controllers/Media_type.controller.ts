import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateMedia_typeDto } from 'src/media_types/dtos/CreateMedia_type.dto';
import { UpdateMedia_typeDto } from 'src/media_types/dtos/UpdateMedia_type.dto';
import { Media_typesService } from 'src/media_types/services/Media_type.service';

@Controller('media_types')
export class Media_typesController {
    constructor(private media_typesService: Media_typesService) { }

    @Get()
    getMedia_types() {
        return this.media_typesService.findMedia_types();
    }

    @Get(':id')
    getMedia_type(@Param('id') id: number) {
        return this.media_typesService.findMedia_typeById(id);
    }

    @Post()
    async createMedia_type(@Body() createMedia_typeDto: CreateMedia_typeDto) {
        //this.media_typesService.createMedia_type(createMedia_typeDto);
        try {
            const message = await this.media_typesService.createMedia_type(createMedia_typeDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Media_type' };
        }
    }

    @Put(':id')
    async updateMedia_type(@Param('id') id: number, @Body() updateMedia_typeDto: UpdateMedia_typeDto) {
       // await this.media_typesService.updateMedia_type(id, updateMedia_typeDto)
        try {
            const message = await this.media_typesService.updateMedia_type(id, updateMedia_typeDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteMedia_typeById(@Param('id', ParseIntPipe) id: number) {
        //await this.media_typesService.deleteMedia_typeById(id);
        try {
            const message = await this.media_typesService.deleteMedia_typeById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
