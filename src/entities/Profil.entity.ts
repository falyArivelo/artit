import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, IsNumber, validateOrReject, ValidationError } from 'class-validator';


@Entity({ name: 'profils' })
export class Profil {

    //profil_id: number; 
    @PrimaryGeneratedColumn()
    profil_id: number;

    @Column()
    @IsNotEmpty()
    profil_label: string;


    @Column({ type: 'int4' })
    @IsNumber()
    profil_state: number;

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