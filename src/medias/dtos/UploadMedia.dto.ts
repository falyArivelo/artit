import { Media_file } from "src/entities/Media_file.entity";
import { UploadMedia_FileDto } from "src/media_files/dtos/UploateMedia_file.dto";

export class UploadMediaDto{
    
    media_source: string; 
    media_name: string; 
    media_ia_descriptor: string;
    media_key_word: string;
    user_id: number;
    art_type_id: number;
    media_type_id: number;
    media_files: UploadMedia_FileDto[];
    files: File[];

    async getMediaFiles(){
        var medias : Media_file[] = [];
        for(let img of this.files){
            const mediaFileData = await this.convertFileToByte(img) as Uint8Array;
            let file :Media_file = new Media_file();
            file.media_file_data = mediaFileData ;
            medias.push(file);
        }
        return medias;
    }
     convertFileToByte(file: File) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = () => {
                // Convert the ArrayBuffer to a Uint8Array
                const byteArray = new Uint8Array(fileReader.result as ArrayBuffer);
                resolve(byteArray);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }
}