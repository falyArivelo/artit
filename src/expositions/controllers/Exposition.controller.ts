import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateExpositionDto } from 'src/expositions/dtos/CreateExposition.dto';
import { UpdateExpositionDto } from 'src/expositions/dtos/UpdateExposition.dto';
import { ExpositionsService } from 'src/expositions/services/Exposition.service';

@Controller('expositions')
export class ExpositionsController {
    constructor(private expositionsService: ExpositionsService) { }

    @Get()
    getExpositions() {
        return this.expositionsService.findExpositions();
    }

    @Get(':id')
    getExposition(@Param('id') id: number) {
        return this.expositionsService.findExpositionById(id);
    }

    @Post()
    async createExposition(@Body() createExpositionDto: CreateExpositionDto) {
        //this.expositionsService.createExposition(createExpositionDto);
        try {
            const message = await this.expositionsService.createExposition(createExpositionDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Exposition' };
        }
    }

    @Put(':id')
    async updateExposition(@Param('id') id: number, @Body() updateExpositionDto: UpdateExpositionDto) {
       // await this.expositionsService.updateExposition(id, updateExpositionDto)
        try {
            const message = await this.expositionsService.updateExposition(id, updateExpositionDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteExpositionById(@Param('id', ParseIntPipe) id: number) {
        //await this.expositionsService.deleteExpositionById(id);
        try {
            const message = await this.expositionsService.deleteExpositionById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
