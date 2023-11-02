import { faker } from '@faker-js/faker';
import { PgPromiseAdapter } from "../../src/infra/database/pg-promise-adapter";
import { Client } from '../../src/domain/entity/client';
import { ClientRepositoryDatabase } from '../../src/infra/repository/client-repository-database';
import { Account } from '../../src/domain/entity/account';
import { AccountRepositoryDatabase } from '../../src/infra/repository/account-repository-database';

const connection = new PgPromiseAdapter();

beforeEach(async () => {
    await connection.connect();
});

afterEach(async () => {
    await connection.close();
});

test("should register and find an account", async () => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const clientRepositoryDatabase = new ClientRepositoryDatabase(connection);
    await clientRepositoryDatabase.save(client);

    const account = new Account({ client });
    account.credit(20);
    const accountRepositoryDatabase = new AccountRepositoryDatabase(connection);
    await accountRepositoryDatabase.save(account);

    const accountFind = await accountRepositoryDatabase.findById(account.id);
    expect(accountFind.id).toBe(account.id);
    expect(account.client.id).toBe(client.id);
});