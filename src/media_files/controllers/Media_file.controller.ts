import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateMedia_fileDto } from 'src/media_files/dtos/CreateMedia_file.dto';
import { UpdateMedia_fileDto } from 'src/media_files/dtos/UpdateMedia_file.dto';
import { Media_filesService } from 'src/media_files/services/Media_file.service';

@Controller('media_files')
export class Media_filesController {
    constructor(private media_filesService: Media_filesService) { }

    @Get()
    getMedia_files() {
        return this.media_filesService.findMedia_files();
    }

    @Get(':id')
    getMedia_file(@Param('id') id: number) {
        return this.media_filesService.findMedia_fileById(id);
    }

    @Post()
    async createMedia_file(@Body() createMedia_fileDto: CreateMedia_fileDto) {
        //this.media_filesService.createMedia_file(createMedia_fileDto);
        try {
            const message = await this.media_filesService.createMedia_file(createMedia_fileDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Media_file' };
        }
    }

    @Put(':id')
    async updateMedia_file(@Param('id') id: number, @Body() updateMedia_fileDto: UpdateMedia_fileDto) {
       // await this.media_filesService.updateMedia_file(id, updateMedia_fileDto)
        try {
            const message = await this.media_filesService.updateMedia_file(id, updateMedia_fileDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteMedia_fileById(@Param('id', ParseIntPipe) id: number) {
        //await this.media_filesService.deleteMedia_fileById(id);
        try {
            const message = await this.media_filesService.deleteMedia_fileById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
