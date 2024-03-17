import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { User } from "./User.entity";
import { Enchere } from "./Enchere.entity";

@Entity({ name: 'enchere_winners' })
export class Enchere_winner {

            //enchere_winner: number; 
            @PrimaryGeneratedColumn()
            enchere_winner_id: number; 


            @ManyToOne(() => User, { nullable: true })
            @JoinColumn({ name: 'user_id' })
            user: User;

            @ManyToOne(() => Enchere, { nullable: true })
            @JoinColumn({ name: 'enchere_id' })
            enchere: Enchere;

            @Column({ type: 'float8' })
         amount: Object; 



    
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