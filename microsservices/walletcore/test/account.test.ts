import { Account } from "../src/domain/entity/account";
import { Client } from "../src/domain/entity/client";

test("should create account", () => {
    const client = new Client({name: 'Anderson', email:'anderson@dev.io'});
    const account = new Account({ client });
    expect(account.id).toBeDefined();
    expect(account.balancer).toBe(0);
    expect(account.client.name).toBe('Anderson');
    expect(account.client.email).toBe('anderson@dev.io');
});

test.each(
    [0, -1]
)("should throw error when deposit amount less or equal to zero", (amount: number) => {
    const client = new Client({name: 'Anderson', email:'anderson@dev.io'});
    const account = new Account({ client });
    expect(
        () =>  account.deposit(amount)
    ).toThrow('Amount cannot be less or equal to zero');
});

test("should do a deposit", () => {
    const client = new Client({name: 'Anderson', email:'anderson@dev.io'});
    const account = new Account({ client });
    account.deposit(40);
    expect(account.balancer).toBe(40);
});