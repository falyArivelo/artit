import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { Event } from "./Event.entity";
import { Media } from "./Media.entity";

@Entity({ name: 'encheres' })
export class Enchere {

            //enchere_id: number; 
            @PrimaryGeneratedColumn()
         enchere_id: number; 


            @ManyToOne(() => Event, { nullable: true })
            @JoinColumn({ name: 'event_id' })
            event: Event;

            @Column()
         enchere_name: string; 


            @Column({ type: 'float8' })
         enchere_price_base: Object; 


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