import { Transaction } from "../../../../domain/entity/transaction";
import { Mapper } from "../../../mapper/maper";
import { TransactionEntityOrm } from "../orm/entity/Transaction";

export class TransactionMapper implements Mapper<Transaction> {
    toDomain(target: any): Transaction {
        return new Transaction({
            id: target.id,
            accountFromId: target.accountFrom_id,
            accountToId: target.accountTo_id,
            amount: target.amount,
            createdAt: target.createdAt,
        });
    }

    toEntityOrm(target: Transaction) {
        const entity = new TransactionEntityOrm();
        entity.id = target.id;
        entity.accountFrom_id = target.accountFromId;
        entity.accountTo_id = target.accountToId;
        entity.amount = target.amount;
        entity.createdAt = target.createAt;
        return entity;
    }

    toPersister(target: Transaction) {
        return {
            id: target.id,
            accountFrom_id: target.accountFromId,
            accountTo_id: target.accountToId,
            amount: target.amount,
            createAt: target.createAt
        }
    }
}