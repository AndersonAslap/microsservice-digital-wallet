import { faker } from '@faker-js/faker';
import { PgPromiseAdapter } from "../../src/infra/database/pg-promise-adapter";
import { Client } from '../../src/domain/entity/client';
import { ClientRepositoryDatabase } from '../../src/infra/repository/client-repository-database';
import { Account } from '../../src/domain/entity/account';
import { AccountRepositoryDatabase } from '../../src/infra/repository/account-repository-database';
import { TransferDomainService } from '../../src/domain/services/transfer';
import { TransactionRepositoryDatabase } from '../../src/infra/repository/transaction-repository-database';

const connection = new PgPromiseAdapter();

beforeEach(async () => {
    await connection.connect();
});

afterEach(async () => {
    await connection.close();
});

test("should register and find a transaction", async () => {
    const clientAccountFrom = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const clientRepositoryDatabase = new ClientRepositoryDatabase(connection);
    await clientRepositoryDatabase.save(clientAccountFrom);

    const accountFrom = new Account({ client:clientAccountFrom });
    accountFrom.credit(20);
    const accountRepositoryDatabase = new AccountRepositoryDatabase(connection);
    await accountRepositoryDatabase.save(accountFrom);

    const clientTo = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    await clientRepositoryDatabase.save(clientTo);

    const accountTo = new Account({ client: clientTo });
    await accountRepositoryDatabase.save(accountTo);

    const transaction = TransferDomainService.execute(accountFrom, accountTo, 10);
    const transactionRepository = new TransactionRepositoryDatabase(connection);
    await transactionRepository.save(transaction);

    const transactionFind = await transactionRepository.findById(transaction.id);
    expect(transactionFind.id).toBe(transaction.id);
});