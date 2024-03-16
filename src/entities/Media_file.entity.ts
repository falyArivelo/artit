import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsNotEmpty, validateOrReject, ValidationError } from 'class-validator';

import { Media } from "./Media.entity";

@Entity({ name: 'media_files' })
export class Media_file {

    //media_files_id: number; 
    @PrimaryGeneratedColumn()
    media_file_id: number;

    @ManyToOne(() => Media, { nullable: true })
    @JoinColumn({ name: 'media_id' })
    media: Media;

    @Column({ type: 'bytea' })
    media_file_data: Uint8Array;

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