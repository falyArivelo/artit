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
import { UsersModule } from './users/modules/User.module';
import { MediasModule } from './medias/modules/Media.module';
import { EventsModule } from './events/modules/Event.module';
import { Media_interactionsModule } from './media_interactions/modules/Media_interaction.module';
import { RechercheService } from './recherche/recherche.service';
import { RechercheController } from './recherche/recherche.controller';
import { IaDescriptorService } from './ia-descriptor/ia-descriptor.service';
import { RechercheModule } from './recherche/recherche.module';
import { Media } from './entities/Media.entity';
// ajout imports

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Le type de votre base de données (postgres pour PostgreSQL)
      host: 'localhost', // L'adresse de votre base de données
      port: 5432, // Le port de votre base de données PostgreSQL par défaut est 5432
      username: 'your_username', // Le nom d'utilisateur de votre base de données
      password: 'your_password', // Le mot de passe de votre base de données
      database: 'artit', // Le nom de votre base de données
      entities: [__dirname + '/**/*.entity{.ts,.js}', Media],
      synchronize: true, // Mettez à true pour synchroniser automatiquement les entités avec la base de données (utile pour le développement)
    }),
    MulterModule.register({
      dest: './uploads', // Répertoire de destination pour enregistrer les fichiers téléchargés
    }),
    GoogleAuthModule,

    ProfilsModule,
    Art_typesModule,
    Media_typesModule,
    PaiementsModule,
    UsersModule,
    MediasModule,
    EventsModule,
    Media_interactionsModule,
    RechercheModule,
     ,
    // a ajouter

  ],
  controllers: [AppController, RechercheController],
  providers: [AppService, IaDescriptorService],
})
export class AppModule { }
