import { Mapper } from "../../infra/mapper/maper"
import { Account } from "../../domain/entity/account"
import { Client } from "../../domain/entity/client"
import { Transaction } from "../../domain/entity/transaction"

export interface MapperFactoryInterface {
    createClientMapper(): Mapper<Client>
    createAccountMapper(): Mapper<Account> 
    createTransactionMapper(): Mapper<Transaction> 
}