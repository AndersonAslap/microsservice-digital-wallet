import { DataSource, In, Repository } from "typeorm";
import { AccountRepository } from "../../application/repository/account-repository";
import { Account } from "../../domain/entity/account";
import { AccountEntityOrm } from "../database/postgres/orm/entity/Account";

export class AccountRepositoryDatabase implements AccountRepository {
    private repository: Repository<AccountEntityOrm>;

    constructor(appDataSource: DataSource) {
        this.repository = appDataSource.getRepository(AccountEntityOrm);
    }

    async findById(id: string): Promise<Account> {
        const accountData = await this.repository.findOne({ 
            where: { id }
        }); 
        return this.mapToAccountDomain(accountData);
    }

    async findManyById(ids: string[]): Promise<Account[]> {
        const accountsData = await this.repository.find({ 
            where: { id: In(ids) }
        }); 
        const accounts = accountsData.map(accountData => {
            return this.mapToAccountDomain(accountData);
        })
        return accounts;
    }

    async save(account: Account): Promise<void> {
        await this.repository.save({
            id: account.id,
            client_id: account.clientId,
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
            .where("id = :id", {id: account.id})
            .execute();
    }

    private mapToAccountDomain(accountData:AccountEntityOrm): Account {
        const account = new Account({
            id: accountData.id,
            clientId: accountData.client_id,
            createdAt: accountData.createdAt,
            updatedAt: accountData.updatedAt
        });
        let balancer = parseInt(accountData.balance.toString());
        account.credit(balancer);
        return account;
    }
}