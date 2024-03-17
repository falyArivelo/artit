import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateEnchere_winnerDto } from 'src/enchere_winners/dtos/CreateEnchere_winner.dto';
import { UpdateEnchere_winnerDto } from 'src/enchere_winners/dtos/UpdateEnchere_winner.dto';
import { Enchere_winnersService } from 'src/enchere_winners/services/Enchere_winner.service';

@Controller('enchere_winners')
export class Enchere_winnersController {
    constructor(private enchere_winnersService: Enchere_winnersService) { }

    @Get()
    getEnchere_winners() {
        return this.enchere_winnersService.findEnchere_winners();
    }

    @Get(':id')
    getEnchere_winner(@Param('id') id: number) {
        return this.enchere_winnersService.findEnchere_winnerById(id);
    }

    @Post()
    async createEnchere_winner(@Body() createEnchere_winnerDto: CreateEnchere_winnerDto) {
        //this.enchere_winnersService.createEnchere_winner(createEnchere_winnerDto);
        try {
            const message = await this.enchere_winnersService.createEnchere_winner(createEnchere_winnerDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Enchere_winner' };
        }
    }

    @Put(':id')
    async updateEnchere_winner(@Param('id') id: number, @Body() updateEnchere_winnerDto: UpdateEnchere_winnerDto) {
       // await this.enchere_winnersService.updateEnchere_winner(id, updateEnchere_winnerDto)
        try {
            const message = await this.enchere_winnersService.updateEnchere_winner(id, updateEnchere_winnerDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteEnchere_winnerById(@Param('id', ParseIntPipe) id: number) {
        //await this.enchere_winnersService.deleteEnchere_winnerById(id);
        try {
            const message = await this.enchere_winnersService.deleteEnchere_winnerById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
