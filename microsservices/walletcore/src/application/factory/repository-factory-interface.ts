import { AccountRepository } from "../repository/account-repository";
import { ClientRepository } from "../repository/client-repository";
import { TransactionRepository } from "../repository/transaction-repository";

export interface RepositoryFactoryInterface {
    createClientRepository(): ClientRepository;
    createAccountRepository(): AccountRepository;
    createTransactionRepository(): TransactionRepository;
}