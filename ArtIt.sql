CREATE TABLE Profils(
   profil_id SERIAL PRIMARY KEY,
   profil_label VARCHAR(500) ,
   profil_state INTEGER NOT NULL
);

CREATE TABLE Art_types(
   art_type_id SERIAL PRIMARY KEY,
   art_type_label INTEGER
);

CREATE TABLE Media_types(
   media_type_id SERIAL PRIMARY KEY,
   media_type_label VARCHAR(250) ,
   media_type_extension VARCHAR(50)  NOT NULL
);

CREATE TABLE Paiements(
   paiement_id SERIAL PRIMARY KEY,
   paiement_label VARCHAR(150)
);

CREATE TABLE Users(
   user_id SERIAL PRIMARY KEY ,
   user_name VARCHAR(250) ,
   user_password VARCHAR(50) ,
   user_birth DATE,
   user_email VARCHAR(500) UNIQUE NOT NULL,
   profil_id INTEGER REFERENCES Profils(profil_id)
);

CREATE TABLE Medias(
   media_id SERIAL PRIMARY KEY,
   media_source TEXT NOT NULL,
   media_name VARCHAR(50)  NOT NULL,
   media_ia_descriptor TEXT,
   media_key_word TEXT,
   user_id INTEGER  NOT NULL,
   art_type_id INTEGER NOT NULL,
   media_type_id INTEGER NOT NULL,
   FOREIGN KEY(user_id) REFERENCES Users(user_id),
   FOREIGN KEY(art_type_id) REFERENCES Art_types(art_type_id),
   FOREIGN KEY(media_type_id) REFERENCES Media_types(media_type_id)
);

CREATE TABLE Media_files(
   Media_files_id SERIAL PRIMARY KEY,
   media_id int,
   media_file_data bytea, 
   FOREIGN KEY(media_id) REFERENCES Medias(media_id)
);

CREATE TABLE Events(
   event_id SERIAL PRIMARY KEY,
   event_name VARCHAR(250) ,
   event_start_date TIMESTAMP NOT NULL,
   event_end_date TIMESTAMP,
   event_description TEXT,
   event_state INTEGER,
   user_id INTEGER  NOT NULL,
   FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Event_details(
   event_detail_id SERIAL PRIMARY KEY,
   event_id int,
   event_price_debut double precision,
   FOREIGN KEY(event_id) REFERENCES Events(event_id)
);

CREATE TABLE Media_interactions(
   media_interactions_id SERIAL PRIMARY KEY,
   media_id INTEGER NOT NULL,
   user_id INTEGER  NOT NULL,
   FOREIGN KEY(media_id) REFERENCES Medias(media_id),
   FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Event_inscriptions(
   event_inscriptions SERIAL PRIMARY KEY,
   user_id int,
   event_inscription_date TIMESTAMP,
   event_inscription_state int,
   FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Donnations(
   donnation_id SERIAL PRIMARY KEY,
   user_id int,
   event_id int,
   donnation_montant double precision,
   donnation_date TIMESTAMP,
   FOREIGN KEY(user_id) REFERENCES Users(user_id),
   FOREIGN KEY(event_id) REFERENCES Events(event_id)
);






