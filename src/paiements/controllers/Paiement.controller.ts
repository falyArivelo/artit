import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePaiementDto } from 'src/paiements/dtos/CreatePaiement.dto';
import { UpdatePaiementDto } from 'src/paiements/dtos/UpdatePaiement.dto';
import { PaiementsService } from 'src/paiements/services/Paiement.service';

@Controller('paiements')
export class PaiementsController {
    constructor(private paiementsService: PaiementsService) { }

    @Get()
    getPaiements() {
        return this.paiementsService.findPaiements();
    }

    @Get(':id')
    getPaiement(@Param('id') id: number) {
        return this.paiementsService.findPaiementById(id);
    }

    @Post()
    async createPaiement(@Body() createPaiementDto: CreatePaiementDto) {
        //this.paiementsService.createPaiement(createPaiementDto);
        try {
            const message = await this.paiementsService.createPaiement(createPaiementDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Paiement' };
        }
    }

    @Put(':id')
    async updatePaiement(@Param('id') id: number, @Body() updatePaiementDto: UpdatePaiementDto) {
       // await this.paiementsService.updatePaiement(id, updatePaiementDto)
        try {
            const message = await this.paiementsService.updatePaiement(id, updatePaiementDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deletePaiementById(@Param('id', ParseIntPipe) id: number) {
        //await this.paiementsService.deletePaiementById(id);
        try {
            const message = await this.paiementsService.deletePaiementById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
