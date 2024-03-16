import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { User } from "./User.entity";
import { Event } from "./Event.entity";

@Entity({ name: 'donnations' })
export class Donnation {

            //donnation_id: number; 
            @PrimaryGeneratedColumn()
         donnation_id: number; 


            @ManyToOne(() => User, { nullable: true })
            @JoinColumn({ name: 'user_id' })
            user: User;

            @ManyToOne(() => Event, { nullable: true })
            @JoinColumn({ name: 'event_id' })
            event: Event;

            @Column({ type: 'float8' })
         donnation_montant: Object; 


            @Column({ type: 'timestamp' })
         donnation_date: Date; 



    
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