import { AccountRepository } from "../../src/application/repository/account-repository";
import { TransactionRepository } from "../../src/application/repository/transaction-repository";
import { CreateTransaction } from "../../src/application/usecases/create-transaction";
import { Account } from "../../src/domain/entity/account";
import { Client } from "../../src/domain/entity/client";

const clientAccountFrom = new Client({name: 'Anderson', email:'anderson@dev.io'});
const accountFrom = new Account({ client: clientAccountFrom });
accountFrom.credit(15);
const clientAccountTo = new Client({name: 'Beatriz', email:'bia@dev.io'});
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

test("should create a transaction", async () => {
    const accountRepository = accountRepositoryMock;
    const transactionRepository = transactionRepositoryMock;
    const usecase = new CreateTransaction(accountRepository, transactionRepository);
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