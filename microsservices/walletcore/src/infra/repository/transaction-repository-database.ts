import { DataSource, Repository } from "typeorm";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { Transaction } from "../../domain/entity/transaction";

import { TransactionEntityOrm } from "../database/postgres/orm/entity/Transaction";

export class TransactionRepositoryDatabase implements TransactionRepository {
    private repository: Repository<TransactionEntityOrm>;

    constructor(appDataSource: DataSource){
        this.repository = appDataSource.getRepository(TransactionEntityOrm);
    }

    async findById(id: string): Promise<Transaction> {
        const transactionData = await this.repository.findOne({ where: { id } });

        return new Transaction({
            id: transactionData.id,
            accountFromId: transactionData.accountFrom_id,
            accountToId: transactionData.accountTo_id,
            amount: transactionData.amount,
            createdAt: transactionData.createdAt,
        });
    }
    
    async save(transaction: Transaction): Promise<void> {
        await this.repository.save({
            id: transaction.id,
            accountFrom_id: transaction.accountFromId,
            accountTo_id: transaction.accountToId,
            amount: transaction.amount,
            createAt: transaction.createAt
        });
    }
}