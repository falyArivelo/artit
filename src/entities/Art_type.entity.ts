import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';


@Entity({ name: 'art_types' })
export class Art_type {

            //art_type_id: number; 
            @PrimaryGeneratedColumn()
         art_type_id: number; 


            @Column({ type: 'int4' })
         art_type_label: number; 



    
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