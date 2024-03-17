import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { Media } from "./Media.entity";

@Entity({ name: 'exposition_medias' })
export class Exposition_media {

            //exposition_media_id: number; 
            @PrimaryGeneratedColumn()
         exposition_media_id: number; 


            @ManyToOne(() => Media, { nullable: true })
            @JoinColumn({ name: 'media_id' })
            media: Media;


    
    @BeforeInsert()
    @BeforeUpdate()
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