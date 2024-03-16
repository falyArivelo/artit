import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateArt_typeDto } from 'src/art_types/dtos/CreateArt_type.dto';
import { UpdateArt_typeDto } from 'src/art_types/dtos/UpdateArt_type.dto';
import { Art_typesService } from 'src/art_types/services/Art_type.service';

@Controller('art_types')
export class Art_typesController {
    constructor(private art_typesService: Art_typesService) { }

    @Get()
    getArt_types() {
        return this.art_typesService.findArt_types();
    }

    @Get(':id')
    getArt_type(@Param('id') id: number) {
        return this.art_typesService.findArt_typeById(id);
    }

    @Post()
    async createArt_type(@Body() createArt_typeDto: CreateArt_typeDto) {
        //this.art_typesService.createArt_type(createArt_typeDto);
        try {
            const message = await this.art_typesService.createArt_type(createArt_typeDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message || 'Une erreur est survenue lors de la création de la Art_type' };
        }
    }

    @Put(':id')
    async updateArt_type(@Param('id') id: number, @Body() updateArt_typeDto: UpdateArt_typeDto) {
       // await this.art_typesService.updateArt_type(id, updateArt_typeDto)
        try {
            const message = await this.art_typesService.updateArt_type(id, updateArt_typeDto);
            return { success: true, message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    
    }

    @Delete(':id')
    async deleteArt_typeById(@Param('id', ParseIntPipe) id: number) {
        //await this.art_typesService.deleteArt_typeById(id);
        try {
            const message = await this.art_typesService.deleteArt_typeById(id);
            return { success: true, message };

        } catch (error) {
            return { success: false, message: error.message};
        }
    }
}
