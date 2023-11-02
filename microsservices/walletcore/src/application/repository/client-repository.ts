import { Client } from "../../domain/entity/client";

export interface ClientRepository {
    get(id: string): Promise<Client>;
    save(client: Client): Promise<void>;
}