import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProfilDto } from 'src/profils/dtos/CreateProfil.dto';
import { UpdateProfilDto } from 'src/profils/dtos/UpdateProfil.dto';
import { ProfilsService } from 'src/profils/services/Profil.service';

@Controller('profils')
export class ProfilsController {
    constructor(private profilsService: ProfilsService) { }

    @Get()
    getProfils() {
        return this.profilsService.findProfils();
    }

    @Get(':id')
    getProfil(@Param('id') id: number) {
        return this.profilsService.findProfilById(id);
    }

    @Post()
    async createProfil(@Body() createProfilDto: CreateProfilDto) {
        //this.profilsService.createProfil(createProfilDto);
        try {
            const message = await this.profilsService.createProfil(createProfilDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Profil' };
        }
    }

    @Put(':id')
    async updateProfil(@Param('id') id: number, @Body() updateProfilDto: UpdateProfilDto) {
       // await this.profilsService.updateProfil(id, updateProfilDto)
        try {
            const message = await this.profilsService.updateProfil(id, updateProfilDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteProfilById(@Param('id', ParseIntPipe) id: number) {
        //await this.profilsService.deleteProfilById(id);
        try {
            const message = await this.profilsService.deleteProfilById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
