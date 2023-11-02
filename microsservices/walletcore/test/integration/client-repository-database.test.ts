import { faker } from '@faker-js/faker';
import { Client } from "../../src/domain/entity/client";
import { PgPromiseAdapter } from "../../src/infra/database/pg-promise-adapter";
import { ClientRepositoryDatabase } from "../../src/infra/repository/client-repository-database";

const connection = new PgPromiseAdapter();

beforeEach(async () => {
    await connection.connect();
});

afterEach(async () => {
    await connection.close();
})

test("should register and find a client", async () => {
    const repositoryDatabase = new ClientRepositoryDatabase(connection);
    const client = new Client({name: faker.person.fullName(), email: faker.internet.email()});
    await repositoryDatabase.save(client);
    const clientFind = await repositoryDatabase.findById(client.id);
    expect(clientFind.id).toBe(client.id);
    expect(clientFind.name).toBe(client.name);
    expect(clientFind.email).toBe(client.email);
    expect(clientFind.createdAt).toStrictEqual(client.createdAt);
    expect(clientFind.updatedAt).toStrictEqual(client.updatedAt);
});