import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateMediaDto } from 'src/medias/dtos/CreateMedia.dto';
import { UpdateMediaDto } from 'src/medias/dtos/UpdateMedia.dto';
import { MediasService } from 'src/medias/services/Media.service';
import { UploadMediaDto } from '../dtos/UploadMedia.dto';
import {  NoFilesInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage_config } from 'src/helper/file.helper';
import { ApiResponse } from 'src/response/apiResponse.dto';

@Controller('medias')
export class MediasController {
    constructor(private mediasService: MediasService, ) { }

    @Get()
    async getMedias() {
        const apiResponse: ApiResponse = new ApiResponse();
        try {
            apiResponse.data = await this.mediasService.findMedias() ;
            apiResponse.success = true;
            apiResponse.status_code = 200;
        } catch(error){
            apiResponse.success = false;
            apiResponse.message = error.message;
            apiResponse.status_code = 500;
        }
        return apiResponse;
    }

    @Get(':id')
    getMedia(@Param('id') id: number) {
        return this.mediasService.findMediaById(id);
    }

    @Get('user/:id')
    async getMediaByUserId(@Param('id') id: number) {
       return await this.mediasService.processFetchUserPreferedMedia(id);
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
    @UseInterceptors(FilesInterceptor('files', null, { storage: storage_config}))
    async createMedia2(@Body() uploadMediaDto: UploadMediaDto, @UploadedFiles() files: File[]) {
        const apiResponse: ApiResponse = new ApiResponse();
        try {
            this.mediasService.processSavingMedia(uploadMediaDto, files);
            apiResponse.success = true;
            apiResponse.message = "Successfully uploaded"
            apiResponse.status_code = 200;
        } catch(error){
            apiResponse.success = false;
            apiResponse.message = error.message;
            apiResponse.status_code = 500;
        }
        return apiResponse;
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
