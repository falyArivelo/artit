import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { User } from "./User.entity";
import { Art_type } from "./Art_type.entity";
import { Media_type } from "./Media_type.entity";

@Entity({ name: 'medias' })
export class Media {

   //media_id: number; 
   @PrimaryGeneratedColumn()
   media_id: number; 


   @Column({ type: 'text' })
   media_source: string;


   @Column()
   media_name: string; 


   @Column({ type: 'text' })
   media_ia_descriptor: string; 


   @Column({ type: 'text' })
   media_key_word: string; 


   @ManyToOne(() => User, { nullable: true })
   @JoinColumn({ name: 'user_id' })
   user: User;

   @ManyToOne(() => Art_type, { nullable: true })
   @JoinColumn({ name: 'art_type_id' })
   art_type: Art_type;

   @ManyToOne(() => Media_type, { nullable: true })
   @JoinColumn({ name: 'media_type_id' })
   media_type: Media_type;

   score: number;

    
    //@BeforeInsert()
    //@BeforeUpdate()
    async validate() {
        try {
            await validateOrReject(this, { skipMissingProperties: true });
        } catch (errors) {
            if (errors instanceof Array && errors.length > 0 && errors[0] instanceof ValidationError) {
                const errorMessage = Object.values(errors[0].constraints).join(', ');
                console.log(errorMessage)
                throw new Error(errorMessage);
            }
        }
    }

}