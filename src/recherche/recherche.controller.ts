import { Body, Controller, Post } from '@nestjs/common';
import { RechercheService } from './recherche.service';
import { ApiResponse } from 'src/response/apiResponse.dto';

@Controller('recherche')
export class RechercheController {
    constructor(private rechercheService: RechercheService) { }

    @Post()
    async search(@Body() textToSearch: string) {
        var response: ApiResponse = new ApiResponse();
        try{
            response.data = await this.rechercheService.search(textToSearch);
            response.success = true
            response.status_code = 200;
        }catch(error){
            response.success = false;
            response.error = true;
            response.message = error.message;
            response.status_code = 500;
        }
        return response;
    }
}
