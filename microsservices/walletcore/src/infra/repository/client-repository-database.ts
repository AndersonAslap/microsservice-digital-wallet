import { ClientRepository } from "../../application/repository/client-repository";
import { Client } from "../../domain/entity/client";
import { DatabaseConnection } from "../database/database-connection";
import { AppError } from "../error/app-error";

export class ClientRepositoryDatabase implements ClientRepository {

    constructor(readonly connection: DatabaseConnection) {}
    
    async findById(id: string): Promise<Client> {
        try {
            const [clientData] = await this.connection.query('select * from clients where id = $1', [id]);
            if (!clientData) throw new AppError('Client not found');
            return new Client({
                id: clientData.id,
                name: clientData.name,
                email: clientData.email,
                createdAt: clientData.created_at,
                updatedAt: clientData.updated_at
            });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error('a problem occurred while running');
        }
    }

    async save(client: Client): Promise<void> {
        try {
            await this.connection.query(
                "insert into clients (id, name, email, created_at, updated_at) values ($1, $2, $3, $4, $5)", 
                [client.id, client.name, client.email, new Date(client.createdAt), new Date(client.updatedAt)]
            );
        } catch (error) {
            console.log(error);
            throw new Error('a problem occurred while running');
        }
    }
}