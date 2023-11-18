import { DataSource } from "typeorm";
import { EventDispatcher } from "../../../../shared/events/src/event-dispatcher";
import { UsecaseFactoryInterface } from "../../application/factory/usecase-factory-interface";
import { CreateAccount } from "../../application/usecases/create-account";
import { CreateClient } from "../../application/usecases/create-client";
import { CreateTransaction } from "../../application/usecases/create-transaction";
import { TransactionCreatedEvent } from "../../domain/events/transaction/transaction-created-event";
import { RepositoryFactory } from "./repository-factory";

export class UsecaseFactory implements UsecaseFactoryInterface {

    constructor(
        readonly repositoryFactory: RepositoryFactory, 
        readonly eventDispatcher: EventDispatcher,
        readonly dataSource: DataSource
    ) {}
    
    createClientUseCase(): CreateClient {
        return new CreateClient(this.repositoryFactory.createClientRepository());
    }
    
    createAccountUseCase(): CreateAccount {
        return new CreateAccount(
            this.repositoryFactory.createAccountRepository(), 
            this.repositoryFactory.createClientRepository()
        );
    }
    
    createTransactionUseCase(): CreateTransaction {
        return new CreateTransaction(
            this.repositoryFactory.createAccountRepository(),
            this.repositoryFactory.createTransactionRepository(),
            this.eventDispatcher,
            new TransactionCreatedEvent(),
            this.dataSource
        );
    }
}