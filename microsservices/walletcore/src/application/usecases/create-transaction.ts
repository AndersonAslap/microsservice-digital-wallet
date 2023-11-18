import { TransferDomainService } from "../../domain/services/transfer";
import { AccountRepository } from "../repository/account-repository";
import { TransactionRepository } from "../repository/transaction-repository";
import { EventDispatcherInterface } from "../../../../shared/events/src/interfaces/event-dispatcher";
import { EventInterface } from "../../../../shared/events/src/interfaces/event";
import { DataSource } from "typeorm";
import { UnitOfWork } from "../../infra/database/postgres/UnitOfWork";
import { MapperFactory } from "../../infra/factory/mapper-factory";

export class CreateTransaction {

    constructor(
        readonly accountRepository: AccountRepository, 
        readonly transactionRepository: TransactionRepository,
        readonly mapperFactory: MapperFactory,
        readonly eventDispatcher: EventDispatcherInterface,
        readonly transactionCreatedEvent: EventInterface,
        readonly dataSource: DataSource
    ) {}

    async execute(input: Input): Promise<Output> {
      const unitOfWork = new UnitOfWork(this.dataSource);
      const accountMapper = this.mapperFactory.createAccountMapper();
      const transactionMapper = this.mapperFactory.createTransactionMapper();
      
      try {
        await unitOfWork.start();
        const [accountFrom, accountTo] = await this.accountRepository.findManyById([input.accountFromId, input.accountToId]);
        const transaction = TransferDomainService.execute(accountFrom, accountTo, input.amount);
        
        await unitOfWork.queryRunner.manager.save([
          accountMapper.toEntityOrm(accountFrom),
          accountMapper.toEntityOrm(accountTo),
          transactionMapper.toEntityOrm(transaction)
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