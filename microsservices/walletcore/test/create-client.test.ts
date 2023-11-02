import { ClientRepository } from "../src/application/repository/client-repository";
import { CreateClient } from "../src/application/usecases/create-client";

const clientRepositoryMock : ClientRepository = {
    save: jest.fn().mockResolvedValue(Promise.resolve),
    get: jest.fn()
}

test("should create a client", async () => {
    const clientRepository = clientRepositoryMock;
    const createClientUseCase = new CreateClient(clientRepository);
    const input = {
        name: 'Anderson',
        email: 'anderson@dev.io'
    }
    const output = await createClientUseCase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.name).toBe('Anderson');
    expect(output.email).toBe('anderson@dev.io');
    expect(clientRepository.save).toHaveBeenCalled();
});