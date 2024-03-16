import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { Profil } from "./Profil.entity";

@Entity({ name: 'users' })
export class User {

   //user_id: number; 
   @PrimaryGeneratedColumn()

   user_id: number;

   @Column()
   @IsNotEmpty()
   name: string;

   @Column()
   gender:string;
   
   @Column()
   password: string;


   @Column({ type: 'date' })
   birth: Date;


   @Column()
   email: string;

   @ManyToOne(() => Profil, { nullable: true })
   @JoinColumn({ name: 'profil_id' })
   profil: Profil;


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