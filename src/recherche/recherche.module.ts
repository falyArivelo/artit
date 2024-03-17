import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { RechercheController } from './recherche.controller';
import { RechercheService } from './recherche.service';
import { MediasModule } from 'src/medias/modules/Media.module';
import { Media_file } from 'src/entities/Media_file.entity';
import { Media_filesService } from 'src/media_files/services/Media_file.service';
import { User_historique } from 'src/entities/User_historique.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Media, Media_file, User_historique]), MediasModule],
    controllers: [ RechercheController],
    providers: [RechercheService, Media_filesService]
})
export class RechercheModule {}
