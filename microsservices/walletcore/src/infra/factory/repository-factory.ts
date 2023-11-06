import { DataSource } from "typeorm";
import { RepositoryFactoryInterface } from "../../application/factory/repository-factory-interface";
import { AccountRepository } from "../../application/repository/account-repository";
import { ClientRepository } from "../../application/repository/client-repository";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { AccountRepositoryDatabase } from "../repository/account-repository-database";
import { ClientRepositoryDatabase } from "../repository/client-repository-database";
import { TransactionRepositoryDatabase } from "../repository/transaction-repository-database";

export class RepositoryFactory implements RepositoryFactoryInterface {
    
    constructor(readonly dataSource: DataSource) {}

    createClientRepository(): ClientRepository {
        return new ClientRepositoryDatabase(this.dataSource);
    }
    
    createAccountRepository(): AccountRepository {
        return new AccountRepositoryDatabase(this.dataSource);
    }
    
    createTransactionRepository(): TransactionRepository {
        return new TransactionRepositoryDatabase(this.dataSource);
    }
}