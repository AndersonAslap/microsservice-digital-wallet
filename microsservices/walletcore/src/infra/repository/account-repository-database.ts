import { AccountRepository } from "../../application/repository/account-repository";
import { Account } from "../../domain/entity/account";
import { Client } from "../../domain/entity/client";
import { DatabaseConnection } from "../database/database-connection";
import { AppError } from "../error/app-error";

export class AccountRepositoryDatabase implements AccountRepository {
    constructor(readonly connection: DatabaseConnection) {}

    async findById(id: string): Promise<Account> {
        try {
            const [accountData] = await this.connection.query("select * from accounts where id = $1", [id]);
            if (!accountData) throw new AppError('Account not found');
            const [clientData] = await this.connection.query("select * from clients where id = $1", [accountData.client_id]);
            const client = new Client({
                name: clientData.name,
                email: clientData.email
            });
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
            console.log(error);
            throw new Error('a problem occurred while running');
        }
    }

    async save(account: Account): Promise<void> {
        try {
            await this.connection.query(
                "insert into accounts (id, client_id, balancer, created_at, updated_at) values ($1, $2, $3, $4, $5)", 
                [account.id, account.client.id, account.balancer, account.createdAt, account.updatedAt]
            );
        } catch (error) {
            console.log(error);
            throw new Error('a problem occurred while running');
        }
    }
}