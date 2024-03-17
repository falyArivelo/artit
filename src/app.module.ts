import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthModule } from './google-auth/google-auth.module';

import { ProfilsModule } from './profils/modules/Profil.module';
import { Art_typesModule } from './art_types/modules/Art_type.module';
import { Media_typesModule } from './media_types/modules/Media_type.module';
import { PaiementsModule } from './paiements/modules/Paiement.module';
import { MediasModule } from './medias/modules/Media.module';
import { EventsModule } from './events/modules/Event.module';
import { Media_interactionsModule } from './media_interactions/modules/Media_interaction.module';
import { RechercheService } from './recherche/recherche.service';
import { RechercheController } from './recherche/recherche.controller';
import { IaDescriptorService } from './ia-descriptor/ia-descriptor.service';
import { RechercheModule } from './recherche/recherche.module';
import { Media } from './entities/Media.entity';
import { UsersModule } from './users/users.module';
import { Media_filesModule } from './media_files/modules/Media_file.module';
import { Event_inscriptionsModule } from './event_inscriptions/modules/Event_inscription.module';
import { DonnationsModule } from './donnations/modules/Donnation.module';
import { Event_detailsModule } from './event_details/modules/Event_detail.module';
import { AuthModule } from './auth/auth.module';
import { EncheresModule } from './encheres/modules/Enchere.module';
import { Enchere_winnersModule } from './enchere_winners/modules/Enchere_winner.module';
import { ExpositionsModule } from './expositions/modules/Exposition.module';
import { Exposition_mediasModule } from './exposition_medias/modules/Exposition_media.module';
// ajout imports

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Le type de votre base de données (postgres pour PostgreSQL)
      host: 'localhost', // L'adresse de votre base de données
      port: 5432, // Le port de votre base de données PostgreSQL par défaut est 5432
      username: 'your_username', // Le nom d'utilisateur de votre base de données
      password: 'your_password', // Le mot de passe de votre base de données
      database: 'artit2', // Le nom de votre base de données
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Mettez à true pour synchroniser automatiquement les entités avec la base de données (utile pour le développement)
    }),
    MulterModule.register({
      dest: './uploads', // Répertoire de destination pour enregistrer les fichiers téléchargés
    }),
    GoogleAuthModule,
    AuthModule,
    ProfilsModule,
    Art_typesModule,
    Media_typesModule,
    PaiementsModule,
    UsersModule,
    MediasModule,
    EventsModule,
    Media_interactionsModule,
    RechercheModule,
    Media_filesModule,
    Event_inscriptionsModule,
    DonnationsModule,
    Event_detailsModule,
EncheresModule,
Enchere_winnersModule,
ExpositionsModule,
Exposition_mediasModule,
    // a ajouter
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
