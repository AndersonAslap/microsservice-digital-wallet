import { AccountRepository } from "../../src/application/repository/account-repository";
import { ClientRepository } from "../../src/application/repository/client-repository";
import { CreateAccount } from "../../src/application/usecases/create-account";
import { Client } from "../../src/domain/entity/client";

const client = new Client({name: 'Anderson', email: 'anderson@dev.io'});

const clientRepositoryMock : ClientRepository = {
    save: jest.fn(),
    findById: jest.fn().mockReturnValue(client)
}

const accountRepositoryMock : AccountRepository = {
    save: jest.fn().mockResolvedValue(Promise.resolve),
    findById: jest.fn()
}

test("should create an account", async () => {
    const accountRepository = accountRepositoryMock;
    const clientRepository = clientRepositoryMock;
    const usecase = new CreateAccount(accountRepository, clientRepository);
    const input = {
        clientId: client.id
    };
    const output = await usecase.execute(input);
    expect(output.id).toBeDefined();
    expect(clientRepository.findById).toHaveBeenCalled();
    expect(accountRepository.save).toHaveBeenCalled();
});