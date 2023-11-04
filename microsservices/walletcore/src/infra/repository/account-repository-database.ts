import { AccountRepository } from "../../application/repository/account-repository";
import { Account } from "../../domain/entity/account";
import { Client } from "../../domain/entity/client";
import { DatabaseConnection } from "../database/database-connection";
import { AppError } from "../error/app-error";

export class AccountRepositoryDatabase implements AccountRepository {
    constructor(readonly db: DatabaseConnection) {}

    async findById(id: string): Promise<Account> {
        try {
            const [accountData] = await this.db.query("select * from accounts where id = $1", [id]);
            if (!accountData) throw new AppError('Account not found');
            const client = await this.getClientById(accountData.client_id);
            const account = new Account({
                id: accountData.id,
                client,
                createdAt: accountData.createdAt,
                updatedAt: accountData.updatedAt
            })
            if (parseInt(accountData.balancer) > 0) {
                account.credit(parseInt(accountData.balancer));
            }
            return account;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error('a problem occurred while running');
        }
    }

    async save(account: Account): Promise<void> {
        try {
            await this.db.transaction(
                async db => {
                    await db.query(
                        "insert into accounts (id, client_id, balancer, created_at, updated_at) values ($1, $2, $3, $4, $5)", 
                        [account.id, account.client.id, account.balancer, account.createdAt, account.updatedAt]
                    );
                }
            );
        } catch (error) {
            throw new Error('a problem occurred while running');
        }
    }

    async updateBalance(account: Account): Promise<void> {
        try {
            await this.db.transaction(
                async db => {
                    await db.query(
                        "update accounts set balancer = $1, updated_at = $2 where id = $3", 
                        [account.balancer, account.updatedAt, account.id]
                    );
                }
            );  
        } catch (error) {
            throw new Error('a problem occurred while running');
        }
    }

    private async getClientById(id: string): Promise<Client> {
        const [clientData] = await this.db.query("select * from clients where id = $1", [id]);
        return new Client({
            name: clientData.name,
            email: clientData.email
        });
    }
}