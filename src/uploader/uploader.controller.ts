import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { multerOptions } from './multer.config';


@Controller('files')
export class UploaderController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Post('uploadMultiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // 'files' correspond à votre champ de fichier et 10 est le nombre maximum de fichiers
  async uploadFiles(@UploadedFiles() files) {
    console.log(files);
  }
}

