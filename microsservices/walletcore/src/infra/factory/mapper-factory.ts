import { MapperFactoryInterface } from "../../application/factory/mapper-factory-interface";
import { Account } from "../../domain/entity/account";
import { Client } from "../../domain/entity/client";
import { Transaction } from "../../domain/entity/transaction";
import { AccountMapper } from "../database/postgres/mapper/account-mapper";
import { ClientMapper } from "../database/postgres/mapper/client-mapper";
import { TransactionMapper } from "../database/postgres/mapper/transaction-mapper";
import { Mapper } from "../mapper/maper";

export class MapperFactory implements MapperFactoryInterface {
    
    createClientMapper(): Mapper<Client> {
        return new ClientMapper();
    }
    
    createAccountMapper(): Mapper<Account> {
        return new AccountMapper();
    }

    createTransactionMapper(): Mapper<Transaction> {
        return new TransactionMapper();
    }
}