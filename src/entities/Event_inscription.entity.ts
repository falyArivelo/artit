import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { User } from "./User.entity";

@Entity({ name: 'event_inscriptions' })
export class Event_inscription {

    //event_inscriptions: number; 
    @PrimaryGeneratedColumn()
    event_inscription_id: number;


    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'timestamp' })
    event_inscription_date: Date;


    @Column({ type: 'int4' })
    event_inscription_state: number;




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