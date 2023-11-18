import { Account } from "../../../../domain/entity/account";
import { Mapper } from "../../../mapper/maper";
import { AccountEntityOrm } from "../orm/entity/Account";

export class AccountMapper implements Mapper<Account> {
    toDomain(target: AccountEntityOrm): Account {
        const account = new Account({
            id: target.id,
            clientId: target.client_id,
            createdAt: target.createdAt,
            updatedAt: target.updatedAt
        });
        let balancer = parseInt(target.balance.toString());
        account.credit(balancer);
        return account;
    }

    toEntityOrm(target: Account): AccountEntityOrm {
        const entity = new AccountEntityOrm();
        entity.id = target.id;
        entity.client_id = target.clientId;
        entity.balance = target.balancer;
        entity.createdAt = target.createdAt;
        entity.updatedAt = target.updatedAt;
        return entity;
    }

    toPersister(target: Account) {
        return {
            id: target.id,
            client_id: target.clientId,
            balance: target.balancer,
            createdAt: target.createdAt,
            updatedAt: target.updatedAt
        }
    }
}