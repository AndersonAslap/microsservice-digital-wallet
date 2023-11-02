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