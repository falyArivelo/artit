import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { User } from "./User.entity";

@Entity({ name: 'events' })
export class Event {

            //event_id: number; 
            @PrimaryGeneratedColumn()
         event_id: number; 


            @Column()
         event_name: string; 


            @Column({ type: 'timestamp' })
         event_start_date: Date; 


            @Column({ type: 'timestamp' })
         event_end_date: Date; 


            @Column({ type: 'numeric' })
         event_price_start: Object; 


            @Column({ type: 'text' })
         event_description: string; 


            @Column({ type: 'int4' })
         event_state: number; 


            @ManyToOne(() => User, { nullable: true })
            @JoinColumn({ name: 'user_id' })
            user: User;


    
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