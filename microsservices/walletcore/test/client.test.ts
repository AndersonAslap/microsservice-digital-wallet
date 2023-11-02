import { Client } from "../src/domain/entity/client";

test("should create a client", () => {
    const client = new Client({ name: 'Anderson', email: 'anderson@dev.io' });
    expect(client.id).toBeDefined();
    expect(client.name).toBe('Anderson');
    expect(client.email).toBe('anderson@dev.io');
})

test("should throw error when name is empty", () => {
    expect(() => new Client({name: '', email: 'anderson@dev.io'})).toThrow('Name is required');
});