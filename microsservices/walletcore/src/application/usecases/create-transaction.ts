import { TransferDomainService } from "../../domain/services/transfer";
import { AccountRepository } from "../repository/account-repository";
import { TransactionRepository } from "../repository/transaction-repository";
import { EventDispatcherInterface } from "../../../../shared/events/src/interfaces/event-dispatcher";
import { EventInterface } from "../../../../shared/events/src/interfaces/event";

export class CreateTransaction {

    constructor(
        readonly accountRepository: AccountRepository, 
        readonly transactionRepository: TransactionRepository,
        readonly eventDispatcher: EventDispatcherInterface,
        readonly transactionCreatedEvent: EventInterface
    ) {}

    async execute(input: Input): Promise<Output> {
        const accountFrom = await this.accountRepository.findById(input.accountFromId);
        const accountTo = await this.accountRepository.findById(input.accountToId);
        const transaction = TransferDomainService.execute(accountFrom, accountTo, input.amount);
        await this.accountRepository.updateBalance(transaction._accountFrom);
        await this.accountRepository.updateBalance(transaction._accountTo);
        await this.transactionRepository.save(transaction);
        this.transactionCreatedEvent.setPayload(transaction);
        this.eventDispatcher.dispatch(this.transactionCreatedEvent);
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