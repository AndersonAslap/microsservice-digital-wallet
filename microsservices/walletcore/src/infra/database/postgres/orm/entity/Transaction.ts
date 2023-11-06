import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { AccountEntityOrm} from './Account';
  
@Entity('transactions')
export class TransactionEntityOrm {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("uuid", { unique: true })
    _id: string

    @Column("uuid")
    accountFrom_id: string;

    @Column("uuid")
    accountTo_id: string;

    @Column()
    amount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => AccountEntityOrm)
    @JoinColumn({ name: 'accountFrom_id', referencedColumnName: '_id' })
    accountFrom: AccountEntityOrm;

    @ManyToOne(() => AccountEntityOrm)
    @JoinColumn({ name: 'accountTo_id', referencedColumnName: '_id' })
    accountTo: AccountEntityOrm;
}
  