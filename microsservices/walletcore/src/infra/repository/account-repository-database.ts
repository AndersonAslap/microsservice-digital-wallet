import { DataSource, Repository } from "typeorm";
import { AccountRepository } from "../../application/repository/account-repository";
import { Account } from "../../domain/entity/account";
import { Client } from "../../domain/entity/client";
import { AppError } from "../error/app-error";
import { AccountEntityOrm } from "../database/postgres/orm/entity/Account";

export class AccountRepositoryDatabase implements AccountRepository {
    private repository: Repository<AccountEntityOrm>;

    constructor(appDataSource: DataSource) {
        this.repository = appDataSource.getRepository(AccountEntityOrm);
    }

    async findById(id: string): Promise<Account> {
        const accountData = await this.repository.findOne({ 
            where: { _id: id }, 
            relations: ['client'] 
        }); 
        const account = new Account({
            id: accountData._id,
            client: new Client({
                id: accountData.client._id,
                name: accountData.client.name,
                email: accountData.client.email,
                createdAt: accountData.client.createdAt,
                updatedAt: accountData.client.updatedAt,
            }),
            createdAt: accountData.createdAt,
            updatedAt: accountData.updatedAt
        });
        let balancer = typeof accountData.balance === "number" 
            ? accountData.balance
            : parseInt(accountData.balance)
        if (balancer > 0) {
            account.credit(balancer);
        }
        return account;
    }

    async save(account: Account): Promise<void> {
        await this.repository.save({
            _id: account.id,
            client_id: account.client.id,
            balance: account.balancer,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt
        });
    }

    async updateBalance(account: Account): Promise<void> {        
        await this.repository
            .createQueryBuilder()
            .update('accounts')
            .set({ balance: account.balancer })
            .where("_id = :id", {id: account.id})
            .execute();
    }
}