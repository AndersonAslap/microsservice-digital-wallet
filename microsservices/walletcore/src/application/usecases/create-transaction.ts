import { Transaction } from "../../domain/entity/transaction";
import { TransferDomainService } from "../../domain/services/transfer";
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
        const transaction = TransferDomainService.execute(accountFrom, accountTo, input.amount);
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