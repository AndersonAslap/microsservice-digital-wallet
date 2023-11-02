import { Client } from "../../domain/entity/client";

export interface ClientRepository {
    findById(id: string): Promise<Client>;
    save(client: Client): Promise<void>;
}