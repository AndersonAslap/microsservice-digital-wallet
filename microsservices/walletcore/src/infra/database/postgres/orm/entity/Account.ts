import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ClientEntityOrm } from "./Client";

@Entity("accounts")
export class AccountEntityOrm {
    @PrimaryColumn("uuid", { unique: true })
    id: string;

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
    @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
    client: ClientEntityOrm;
}
