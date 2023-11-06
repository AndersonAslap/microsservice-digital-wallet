import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { AccountEntityOrm } from "./Account";

@Entity("clients")
export class ClientEntityOrm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid", { unique: true })
    _id: string;

    @Column("varchar", { length: 255 })
    name: string;

    @Column("varchar", { length: 255, unique: true })
    email: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Aqui não precisa do @JoinColumn, pois não é o lado proprietário da relação.
    @OneToOne(() => AccountEntityOrm, account => account.client)
    account: AccountEntityOrm;
}
