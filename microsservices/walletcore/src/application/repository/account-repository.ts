import { Account } from "../../domain/entity/account";

export interface AccountRepository {
    findById(id: string): Promise<Account>;
    save(account: Account): Promise<void>;
}