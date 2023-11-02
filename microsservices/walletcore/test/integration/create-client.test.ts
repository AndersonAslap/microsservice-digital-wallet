import { faker } from '@faker-js/faker';
import { ClientRepository } from "../../src/application/repository/client-repository";
import { CreateClient } from "../../src/application/usecases/create-client";

const clientRepositoryMock : ClientRepository = {
    save: jest.fn().mockResolvedValue(Promise.resolve),
    findById: jest.fn()
}

test("should create a client", async () => {
    const clientRepository = clientRepositoryMock;
    const usecase = new CreateClient(clientRepository);
    const input = {
        name: faker.person.fullName(),
        email: faker.internet.email()
    }
    const output = await usecase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(clientRepository.save).toHaveBeenCalled();
});