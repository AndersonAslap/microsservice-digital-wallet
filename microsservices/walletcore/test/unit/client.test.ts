import { faker } from '@faker-js/faker';
import { Client } from "../../src/domain/entity/client";

test("should throw error when name is empty", () => {
    expect(
        () => new Client({name: '', email: faker.internet.email()})
    ).toThrow('Name is required');
});

test("should throw error when email is empty", () => {
    expect(
        () => new Client({name: faker.person.fullName(), email: ''})
    ).toThrow('Email is required');
});

test("should create a client", () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const client = new Client({name, email});
    expect(client.id).toBeDefined();
    expect(client.name).toBe(name);
    expect(client.email).toBe(email);
});

test("should throw error when name is empty on update", () => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    expect(
        () => client.update('')
    ).toThrow('Name is required');
});

test("should update a client", () => {
    const client = new Client({
        name: faker.person.fullName(), 
        email: faker.internet.email()
    });
    const newName = faker.person.fullName();
    const newEmail = faker.internet.email();
    client.update(newName, newEmail);
    expect(client.id).toBeDefined();
    expect(client.name).toBe(newName);
    expect(client.email).toBe(newEmail);
});