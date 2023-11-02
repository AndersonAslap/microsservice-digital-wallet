import { Transaction } from "../../domain/entity/transaction";
import { AccountRepository } from "../repository/account-repository";
import { TransactionRepository } from "../repository/transaction-repository";

export class CreateTransaction {

    constructor(
        readonly accountRepository: AccountRepository, 
        readonly transactionRepository: TransactionRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const accountFrom = await this.accountRepository.findById(input.accountFromId);
        const accountTo = await this.accountRepository.findById(input.accountToId);
        const transaction = new Transaction({accountFrom, accountTo, amount: input.amount});
        transaction.transfer();
        await this.transactionRepository.save(transaction);
        return {
            id: transaction._id
        }
    }
}

type Input = {
    accountFromId: string;
    accountToId: string;
    amount: number;
}

type Output = {
    id: string;
}