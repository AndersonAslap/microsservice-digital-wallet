import { faker } from '@faker-js/faker';
import { Account } from "../../src/domain/entity/account";
import { Client } from "../../src/domain/entity/client";

test("should create account", () => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const account = new Account({ client });
    expect(account.id).toBeDefined();
    expect(account.balancer).toBe(0);
});

test.each(
    [0, -1]
)("should throw error when credit amount less or equal to zero", (amount: number) => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const account = new Account({ client });
    expect(
        () =>  account.credit(amount)
    ).toThrow('Amount cannot be less or equal to zero');
});

test("should make a credit", () => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const account = new Account({ client });
    account.credit(40);
    expect(account.balancer).toBe(40);
});

test.each(
    [0, -1]
)("should throw error when debit amount less or equal to zero", (amount: number) => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const account = new Account({ client });
    account.credit(40);
    expect(
        () =>  account.debit(amount)
    ).toThrow('Amount cannot be less or equal to zero');
});

test.each(
    [11, 4]
)("should throw error when debit amount less or equal to zero", (amount: number) => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const account = new Account({ client });
    expect(
        () =>  account.debit(amount)
    ).toThrow('Insufficient balance');
});

test("should make a debit", () => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const account = new Account({ client });
    account.credit(40);
    account.debit(30);
    expect(account.balancer).toBe(10);
});