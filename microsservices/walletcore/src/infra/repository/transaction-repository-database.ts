import { TransactionRepository } from "../../application/repository/transaction-repository";
import { Account } from "../../domain/entity/account";
import { Client } from "../../domain/entity/client";
import { Transaction } from "../../domain/entity/transaction";
import { DatabaseConnection } from "../database/database-connection";
import { AppError } from "../error/app-error";

export class TransactionRepositoryDatabase implements TransactionRepository {
    
    constructor( readonly db: DatabaseConnection ){}

    async findById(id: string): Promise<Transaction> {
        try {
            const [transactionData] = await this.db.query('select * from transactions where id = $1', [id]);
            if (!transactionData) throw new AppError('Client does exists');            
            const accountFrom = await this.getAccount(transactionData.accountfrom_id);
            const accountTo = await this.getAccount(transactionData.accountto_id);
            return new Transaction({
                id: transactionData.id,
                accountFrom,
                accountTo,
                amount: parseInt(transactionData.amount),
                createdAt: transactionData.created_at,
            });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error('a problem occurred while running');
        }
    }
    
    async save(transaction: Transaction): Promise<void> {
        try {
            await this.db.transaction(
                async db => {
                    await db.query(
                        "insert into transactions (id, accountfrom_id, accountto_id, amount, created_at) values ($1, $2, $3, $4, $5)", 
                        [transaction.id, transaction._accountFrom.id, transaction._accountTo.id, transaction._amount, transaction._createdAt]
                    );
                }
            );  
        } catch (error) {
            throw new Error('a problem occurred while running');
        }
    }

    private async getAccount(accountId: string) : Promise<Account>{
        const [accountData] = await this.db.query('select * from accounts where id = $1', [accountId]);
        const client = await this.getClient(accountData.client_id);
        const account = new Account({ 
            id: accountData.id,
            client,
            createdAt: accountData.created_at,
            updatedAt: accountData.updated_at
        });
        parseInt(accountData.balancer) > 0 && account.credit(parseInt(accountData.balancer));
        return account;
    }

    private async getClient(clientId: string) : Promise<Client> {
        const [clientData] = await this.db.query('select * from clients where id = $1', [clientId]);
        return new Client({
            id: clientData.id,
            name: clientData.name,
            email: clientData.email,
            createdAt: clientData.created_at,
            updatedAt: clientData.updated_at
        });
    }
}