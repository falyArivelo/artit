import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { Media } from "./Media.entity";
import { User } from "./User.entity";

@Entity({ name: 'media_interactions' })
export class Media_interaction {

    //media_interactions_id: number; 
    @PrimaryGeneratedColumn()
    media_interactions_id: number;


    @ManyToOne(() => Media, { nullable: true })
    @JoinColumn({ name: 'media_id' })
    media: Media;

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