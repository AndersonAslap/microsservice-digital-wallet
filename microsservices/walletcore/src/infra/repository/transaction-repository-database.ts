import { DataSource, Repository } from "typeorm";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { Account } from "../../domain/entity/account";
import { Client } from "../../domain/entity/client";
import { Transaction } from "../../domain/entity/transaction";
import { AppError } from "../error/app-error";
import { TransactionEntityOrm } from "../database/postgres/orm/entity/Transaction";

export class TransactionRepositoryDatabase implements TransactionRepository {
    private repository: Repository<TransactionEntityOrm>;

    constructor(appDataSource: DataSource){
        this.repository = appDataSource.getRepository(TransactionEntityOrm);
    }

    async findById(id: string): Promise<Transaction> {
        const transactionData = await this.repository
            .createQueryBuilder('transaction') 
            .leftJoinAndSelect('transaction.accountFrom', 'accountFrom') 
            .leftJoinAndSelect('transaction.accountTo', 'accountTo') 
            .leftJoinAndSelect('accountFrom.client', 'accountFromClient') 
            .leftJoinAndSelect('accountTo.client', 'accountToClient') 
            .where('transaction._id = :id', { id }) 
            .getOne(); 

        return new Transaction({
            id: transactionData._id,
            accountFrom: new Account({
                id: transactionData.accountFrom._id,
                client: new Client({
                    id: transactionData.accountFrom.client._id,
                    name: transactionData.accountFrom.client.name,
                    email: transactionData.accountFrom.client.email,
                    createdAt: transactionData.accountFrom.client.createdAt,
                    updatedAt: transactionData.accountFrom.client.updatedAt,
                }),
                createdAt: transactionData.accountFrom.createdAt,
                updatedAt: transactionData.accountFrom.updatedAt,
            }),
            accountTo: new Account({
                id: transactionData.accountFrom._id,
                client: new Client({
                    id: transactionData.accountTo.client._id,
                    name: transactionData.accountTo.client.name,
                    email: transactionData.accountTo.client.email,
                    createdAt: transactionData.accountTo.client.createdAt,
                    updatedAt: transactionData.accountTo.client.updatedAt,
                }),
                createdAt: transactionData.accountTo.createdAt,
                updatedAt: transactionData.accountTo.updatedAt,
            }),
            amount: transactionData.amount,
            createdAt: transactionData.createdAt,
        });
    }
    
    async save(transaction: Transaction): Promise<void> {
        await this.repository.save({
            _id: transaction.id,
            accountFrom_id: transaction.accountFrom.id,
            accountTo_id: transaction.accountTo.id,
            amount: transaction.amount,
            createAt: transaction.createAt
        });
    }
}