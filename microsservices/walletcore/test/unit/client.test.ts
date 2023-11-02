import { Client } from "../../src/domain/entity/client";

test("should throw error when name is empty", () => {
    expect(
        () => new Client({name: '', email: 'anderson@dev.io'})
    ).toThrow('Name is required');
});

test("should throw error when email is empty", () => {
    expect(
        () => new Client({name: 'Anderson', email: ''})
    ).toThrow('Email is required');
});

test("should create a client", () => {
    const client = new Client({ name: 'Anderson', email: 'anderson@dev.io' });
    expect(client.id).toBeDefined();
    expect(client.name).toBe('Anderson');
    expect(client.email).toBe('anderson@dev.io');
});

test("should throw error when name is empty on update", () => {
    const client = new Client({name: 'Ivan', email: 'ivan@dev.io0'});
    expect(
        () => client.update('')
    ).toThrow('Name is required');
});

test("should update a client", () => {
    const client = new Client({ name: 'Anderson', email: 'anderson@dev.io' });
    client.update('Beatriz', 'bia@dev.io');
    expect(client.id).toBeDefined();
    expect(client.name).toBe('Beatriz');
    expect(client.email).toBe('bia@dev.io');
});