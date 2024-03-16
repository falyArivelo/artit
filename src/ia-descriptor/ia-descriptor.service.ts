import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IaDescriptorService {



    async describeMedia(image: string): Promise<any> {
        try {
            const response = await axios.post(
                'https://api.example.com/data',
                {
                    image: image
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
