import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToOne, PrimaryColumn } from "typeorm";
import { AccountEntityOrm } from "./Account";

@Entity("clients")
export class ClientEntityOrm {
    @PrimaryColumn("uuid", { unique: true })
    id: string;

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
