import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateEnchereDto } from 'src/encheres/dtos/CreateEnchere.dto';
import { UpdateEnchereDto } from 'src/encheres/dtos/UpdateEnchere.dto';
import { EncheresService } from 'src/encheres/services/Enchere.service';

@Controller('encheres')
export class EncheresController {
    constructor(private encheresService: EncheresService) { }

    @Get()
    getEncheres() {
        return this.encheresService.findEncheres();
    }

    @Get(':id')
    getEnchere(@Param('id') id: number) {
        return this.encheresService.findEnchereById(id);
    }

    @Post()
    async createEnchere(@Body() createEnchereDto: CreateEnchereDto) {
        //this.encheresService.createEnchere(createEnchereDto);
        try {
            const message = await this.encheresService.createEnchere(createEnchereDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Enchere' };
        }
    }

    @Put(':id')
    async updateEnchere(@Param('id') id: number, @Body() updateEnchereDto: UpdateEnchereDto) {
       // await this.encheresService.updateEnchere(id, updateEnchereDto)
        try {
            const message = await this.encheresService.updateEnchere(id, updateEnchereDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteEnchereById(@Param('id', ParseIntPipe) id: number) {
        //await this.encheresService.deleteEnchereById(id);
        try {
            const message = await this.encheresService.deleteEnchereById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
