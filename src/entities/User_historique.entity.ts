import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user_historique"})
export class User_historique{
    @PrimaryGeneratedColumn()
    user_historique_id: number;

    @Column()
    user_id: number;
    
    @Column()
    last_search: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
}