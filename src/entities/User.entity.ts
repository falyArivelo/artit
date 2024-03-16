import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
<<<<<<< Updated upstream
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';
=======
import { IsDate, IsEmail, IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';
>>>>>>> Stashed changes

import { Profil } from "./Profil.entity";

@Entity({ name: 'users' })
export class User {

   //user_id: number; 
   @PrimaryGeneratedColumn()
   user_id: number;
<<<<<<< Updated upstream


   @Column()
   user_name: string;


   @Column()
   user_password: string;


   @Column({ type: 'date' })
   user_birth: Date;


   @Column()
   user_email: string;


   @ManyToOne(() => Profil, { nullable: true })
   @JoinColumn({ name: 'profil_id' })
   profil: Profil;



=======

   @Column()
   @IsNotEmpty()
   name: string;

   @Column()
   @IsNotEmpty()
   gender: string;

   @Column()
   @IsNotEmpty()
   password: string;


   @Column({ type: 'date' })
   birth: Date;

   @Column()
   @IsEmail()
   email: string;


   @ManyToOne(() => Profil, { nullable: true })
   @JoinColumn({ name: 'profil_id' })
   @IsNotEmpty()
   profil: Profil;



>>>>>>> Stashed changes
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