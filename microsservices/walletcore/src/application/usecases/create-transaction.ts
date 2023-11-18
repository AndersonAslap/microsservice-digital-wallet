import { TransferDomainService } from "../../domain/services/transfer";
import { AccountRepository } from "../repository/account-repository";
import { TransactionRepository } from "../repository/transaction-repository";
import { EventDispatcherInterface } from "../../../../shared/events/src/interfaces/event-dispatcher";
import { EventInterface } from "../../../../shared/events/src/interfaces/event";
import { DataSource } from "typeorm";
import { AccountEntityOrm } from "../../infra/database/postgres/orm/entity/Account";
import { TransactionEntityOrm } from "../../infra/database/postgres/orm/entity/Transaction";
import { UnitOfWork } from "../../infra/database/postgres/UnitOfWork";

export class CreateTransaction {

    constructor(
        readonly accountRepository: AccountRepository, 
        readonly transactionRepository: TransactionRepository,
        readonly eventDispatcher: EventDispatcherInterface,
        readonly transactionCreatedEvent: EventInterface,
        readonly dataSource: DataSource
    ) {}

    async execute(input: Input): Promise<Output> {
      const unitOfWork = new UnitOfWork(this.dataSource);
      try {
        await unitOfWork.start();
        const [accountFrom, accountTo] = await this.accountRepository.findManyById([input.accountFromId, input.accountToId]);
        const transaction = TransferDomainService.execute(accountFrom, accountTo, input.amount);
        
        await unitOfWork.queryRunner.manager.save([
          AccountEntityOrm.mapToAccountEntityOrm(accountFrom),
          AccountEntityOrm.mapToAccountEntityOrm(accountTo),
          TransactionEntityOrm.mapToTransactionEntityOrm(transaction)
        ]);
        
        this.transactionCreatedEvent.setPayload(transaction);
        this.eventDispatcher.dispatch(this.transactionCreatedEvent);
        await unitOfWork.commit();
        
        return { id: transaction.id };           
      } catch (error) {
        await unitOfWork.rollback();
        throw error;
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