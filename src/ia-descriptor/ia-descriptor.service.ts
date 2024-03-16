import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { python_ai_endpoint } from 'src/api-conf';

@Injectable()
export class IaDescriptorService {

    async describeMedia(image: string): Promise<any> {
        try {
            // if base64 
            const response = await axios.post(
                python_ai_endpoint+'/base64Image',
                {
                    file: image
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async lemmatizer(text: string): Promise<any>{
        try{
            const response = await axios.post(
                python_ai_endpoint+':1112/'+text
            )
        } catch (error) {
            throw error;
        }
    }
}
