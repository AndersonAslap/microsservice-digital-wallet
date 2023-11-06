import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { ClientEntityOrm } from "./Client";

@Entity("accounts")
export class AccountEntityOrm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid", { unique: true })
    _id: string;

    @Column("numeric")
    balance: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column("uuid")
    client_id: string;

    // O lado proprietário da relação onde usamos o @JoinColumn para especificar a coluna que tem a chave estrangeira.
    @OneToOne(() => ClientEntityOrm, client => client.account)
    @JoinColumn({ name: 'client_id', referencedColumnName: '_id' })
    client: ClientEntityOrm;
}
