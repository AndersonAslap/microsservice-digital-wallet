import { Client } from "../../domain/entity/client";
import { ClientRepository } from "../repository/client-repository";

export class CreateClient {

    constructor(readonly clientRepository: ClientRepository) {}

    async execute(input: Input): Promise<Output> {
        const client = new Client({ name: input.name, email: input.email });
        await this.clientRepository.save(client);
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}

type Input = {
    name: string;
    email: string;
}

type Output = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}