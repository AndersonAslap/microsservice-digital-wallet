import { Client } from "../src/domain/entity/client";

test("Should create a client", () => {
    const client = new Client({ name: 'Anderson', email: 'anderson@dev.io' });
    expect(client.id).toBeDefined();
    expect(client.name).toBe('Anderson');
    expect(client.email).toBe('anderson@dev.io');
})