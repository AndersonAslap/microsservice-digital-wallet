import { Account } from "../../domain/entity/account";
import { AccountRepository } from "../repository/account-repository";
import { ClientRepository } from "../repository/client-repository";

export class CreateAccount {

    constructor(
        readonly accountRepository: AccountRepository, 
        readonly clientRepository: ClientRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const client = await this.clientRepository.findById(input.clientId);
        if (!client) throw new Error('Client does not exists');
        const account = new Account({clientId: client.id});
        await this.accountRepository.save(account);
        return {
            id: account.id
        }
    }
}

type Input = {
    clientId: string;
}

type Output = {
    id: string;
}