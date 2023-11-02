import { ClientRepository } from "../../application/repository/client-repository";
import { Client } from "../../domain/entity/client";

export class ClientRepositoryDatabase implements ClientRepository {
    
    async findById(id: string): Promise<Client> {
        throw new Error("Method not implemented.");
    }

    async save(client: Client): Promise<void> {
        throw new Error("Method not implemented.");
    }
}