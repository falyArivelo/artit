import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { Event } from "./Event.entity";

@Entity({ name: 'event_details' })
export class Event_detail {

            //event_detail_id: number; 
            @PrimaryGeneratedColumn()
         event_detail_id: number; 


            @ManyToOne(() => Event, { nullable: true })
            @JoinColumn({ name: 'event_id' })
            event: Event;

            @Column({ type: 'float8' })
         event_price_debut: Object; 



    
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