import { DataSource, Repository } from "typeorm";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { Transaction } from "../../domain/entity/transaction";
import { TransactionEntityOrm } from "../database/postgres/orm/entity/Transaction";
import { TransactionMapper } from "../database/postgres/mapper/transaction-mapper";

export class TransactionRepositoryDatabase implements TransactionRepository {
    private repository: Repository<TransactionEntityOrm>;
    private transactionMapper = new TransactionMapper();

    constructor(appDataSource: DataSource){
        this.repository = appDataSource.getRepository(TransactionEntityOrm);
    }

    async findById(id: string): Promise<Transaction> {
        const transactionData = await this.repository.findOne({ where: { id } });
        return this.transactionMapper.toDomain(transactionData);
    }
    
    async save(transaction: Transaction): Promise<void> {
        const transactionPersister = this.transactionMapper.toPersister(transaction);
        await this.repository.save(transactionPersister);
    }
}