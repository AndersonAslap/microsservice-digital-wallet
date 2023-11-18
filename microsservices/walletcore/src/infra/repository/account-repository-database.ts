import { DataSource, In, Repository } from "typeorm";
import { AccountRepository } from "../../application/repository/account-repository";
import { Account } from "../../domain/entity/account";
import { AccountEntityOrm } from "../database/postgres/orm/entity/Account";
import { AccountMapper } from "../database/postgres/mapper/account-mapper";

export class AccountRepositoryDatabase implements AccountRepository {
    private repository: Repository<AccountEntityOrm>;
    private accountMapper = new AccountMapper();

    constructor(appDataSource: DataSource) {
        this.repository = appDataSource.getRepository(AccountEntityOrm);
    }

    async findById(id: string): Promise<Account> {
        const accountData = await this.repository.findOne({ 
            where: { id }
        }); 
        return this.accountMapper.toDomain(accountData);
    }

    async findManyById(ids: string[]): Promise<Account[]> {
        const accountsData = await this.repository.find({ 
            where: { id: In(ids) },
        }); 
        const orderedAccountsData = ids.map(id => accountsData.find(account => account.id === id));
        return orderedAccountsData.map(accountData => this.accountMapper.toDomain(accountData));
    }

    async save(account: Account): Promise<void> {
        const accountPersister = this.accountMapper.toPersister(account);
        await this.repository.save(accountPersister);
    }

    async updateBalance(account: Account): Promise<void> {        
        await this.repository
            .createQueryBuilder()
            .update('accounts')
            .set({ balance: account.balancer })
            .where("id = :id", {id: account.id})
            .execute();
    }
}