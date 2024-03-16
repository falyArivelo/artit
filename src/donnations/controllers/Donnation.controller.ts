import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateDonnationDto } from 'src/donnations/dtos/CreateDonnation.dto';
import { UpdateDonnationDto } from 'src/donnations/dtos/UpdateDonnation.dto';
import { DonnationsService } from 'src/donnations/services/Donnation.service';

@Controller('donnations')
export class DonnationsController {
    constructor(private donnationsService: DonnationsService) { }

    @Get()
    getDonnations() {
        return this.donnationsService.findDonnations();
    }

    @Get(':id')
    getDonnation(@Param('id') id: number) {
        return this.donnationsService.findDonnationById(id);
    }

    @Post()
    async createDonnation(@Body() createDonnationDto: CreateDonnationDto) {
        //this.donnationsService.createDonnation(createDonnationDto);
        try {
            const message = await this.donnationsService.createDonnation(createDonnationDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Donnation' };
        }
    }

    @Put(':id')
    async updateDonnation(@Param('id') id: number, @Body() updateDonnationDto: UpdateDonnationDto) {
       // await this.donnationsService.updateDonnation(id, updateDonnationDto)
        try {
            const message = await this.donnationsService.updateDonnation(id, updateDonnationDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteDonnationById(@Param('id', ParseIntPipe) id: number) {
        //await this.donnationsService.deleteDonnationById(id);
        try {
            const message = await this.donnationsService.deleteDonnationById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
