import { faker } from '@faker-js/faker';
import { AccountRepository } from "../../src/application/repository/account-repository";
import { TransactionRepository } from "../../src/application/repository/transaction-repository";
import { CreateTransaction } from "../../src/application/usecases/create-transaction";
import { Account } from "../../src/domain/entity/account";
import { Client } from "../../src/domain/entity/client";
import { HandlerInterface } from '../../../shared/events/src/interfaces/handler';
import { EventDispatcher } from "../../../shared/events/src/event-dispatcher";
import { TransactionCreatedEvent } from '../../src/domain/events/transaction/transaction-created-event';

const clientAccountFrom = new Client({
    name: faker.person.fullName(), 
    email: faker.internet.email()
});
const accountFrom = new Account({ client: clientAccountFrom });
accountFrom.credit(15);

const clientAccountTo = new Client({
    name: faker.person.fullName(), 
    email: faker.internet.email()
});
const accountTo = new Account({ client: clientAccountTo });

const accountMap = {
    [accountFrom.id]: accountFrom,
    [accountTo.id]: accountTo
}

const accountRepositoryMock: AccountRepository = {
    findById: jest.fn((id: string) => Promise.resolve(accountMap[id] || null)),
    save: jest.fn()
};

const transactionRepositoryMock: TransactionRepository = {
    findById: jest.fn(),
    save: jest.fn()
}

const handler : HandlerInterface = {
    async handle(event) {
        let payload = event.getPayload();
        console.log(`O client ${payload.accountFrom.client.name} fez uma transferência para o client ${payload.accountTo.client.name} de R$ ${payload.amount}`);
    },
}

test("should create a transaction", async () => {
    const accountRepository = accountRepositoryMock;
    const transactionRepository = transactionRepositoryMock;
    const eventDispatcher = new EventDispatcher();
    const transactionCreatedEvent = new TransactionCreatedEvent();
    eventDispatcher.register(transactionCreatedEvent.getName(), handler);
    const usecase = new CreateTransaction(accountRepository, transactionRepository, eventDispatcher, transactionCreatedEvent);
    const input = {
        accountFromId: accountFrom.id,
        accountToId: accountTo.id,
        amount: 15
    }
    const output = await usecase.execute(input);
    expect(output.id).toBeDefined();
    expect(accountRepository.findById).toHaveBeenCalledTimes(2);
    expect(transactionRepository.save).toHaveBeenCalledTimes(1);
});