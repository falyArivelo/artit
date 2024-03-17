import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user_historique"})
export class User_historique{
    @PrimaryGeneratedColumn()
    user_historique_id: number;
}