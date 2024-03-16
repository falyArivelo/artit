import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/entities/Media.entity';
import { RechercheController } from './recherche.controller';
import { RechercheService } from './recherche.service';
import { MediasModule } from 'src/medias/modules/Media.module';

@Module({
    imports:[TypeOrmModule.forFeature([Media,]), MediasModule],
    controllers: [ RechercheController],
    providers: [RechercheService, ]
})
export class RechercheModule {}
