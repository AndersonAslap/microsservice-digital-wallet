import { RepositoryFactoryInterface } from "../../application/factory/repository-factory-interface";
import { AccountRepository } from "../../application/repository/account-repository";
import { ClientRepository } from "../../application/repository/client-repository";
import { TransactionRepository } from "../../application/repository/transaction-repository";
import { DatabaseConnection } from "../database/database-connection";
import { AccountRepositoryDatabase } from "../repository/account-repository-database";
import { ClientRepositoryDatabase } from "../repository/client-repository-database";
import { TransactionRepositoryDatabase } from "../repository/transaction-repository-database";

export class RepositoryFactory implements RepositoryFactoryInterface {
    
    constructor(readonly connection: DatabaseConnection) {}

    createClientRepository(): ClientRepository {
        return new ClientRepositoryDatabase(this.connection);
    }
    
    createAccountRepository(): AccountRepository {
        return new AccountRepositoryDatabase(this.connection);
    }
    
    createTransactionRepository(): TransactionRepository {
        return new TransactionRepositoryDatabase(this.connection);
    }
}