import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { AccountEntityOrm} from './Account';
  
@Entity('transactions')
export class TransactionEntityOrm {
  @PrimaryColumn("uuid", { unique: true })
  id: string

  @Column("uuid")
  accountFrom_id: string;

  @Column("uuid")
  accountTo_id: string;

  @Column()
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => AccountEntityOrm)
  @JoinColumn({ name: 'accountFrom_id', referencedColumnName: 'id' })
  accountFrom: AccountEntityOrm;

  @ManyToOne(() => AccountEntityOrm)
  @JoinColumn({ name: 'accountTo_id', referencedColumnName: 'id' })
  accountTo: AccountEntityOrm;
}
  