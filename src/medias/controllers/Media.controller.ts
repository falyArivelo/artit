import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateMediaDto } from 'src/medias/dtos/CreateMedia.dto';
import { UpdateMediaDto } from 'src/medias/dtos/UpdateMedia.dto';
import { MediasService } from 'src/medias/services/Media.service';
import { UploadMediaDto } from '../dtos/UploadMedia.dto';
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('medias')
export class MediasController {
    constructor(private mediasService: MediasService) { }

    @Get()
    getMedias() {
        return this.mediasService.findMedias();
    }

    @Get(':id')
    getMedia(@Param('id') id: number) {
        return this.mediasService.findMediaById(id);
    }

    @Post()
    async createMedia(@Body() createMediaDto: CreateMediaDto) {
        //this.mediasService.createMedia(createMediaDto);
        try {
            const message = await this.mediasService.createMedia(createMediaDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Media' };
        }
    }

    @Post("/save")
    @UseInterceptors(FilesInterceptor('files'))
    async createMedia2(@Body() uploadMediaDto: UploadMediaDto, @UploadedFiles() files) {
        try {
            this.mediasService.processSavingMedia(uploadMediaDto, files);
            return "ok";
        } catch(error){
            console.log("error",error);
            return error;
        }
    }

    @Put(':id')
    async updateMedia(@Param('id') id: number, @Body() updateMediaDto: UpdateMediaDto) {
       // await this.mediasService.updateMedia(id, updateMediaDto)
        try {
            const message = await this.mediasService.updateMedia(id, updateMediaDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteMediaById(@Param('id', ParseIntPipe) id: number) {
        //await this.mediasService.deleteMediaById(id);
        try {
            const message = await this.mediasService.deleteMediaById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
