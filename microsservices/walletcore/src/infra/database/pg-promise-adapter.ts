import pgp from 'pg-promise'
import { DatabaseConnection } from "./database-connection";

export class PgPromiseAdapter implements DatabaseConnection {
    connection: any
    
    async connect(): Promise<void> {
        this.connection = pgp()('postgres://postgres:postgres@localhost:5432/wallet_db')
    }
    
    async query(statement: string, params: any): Promise<any> {
        return await this.connection.query(statement, params)
    }

    async close(): Promise<void> {
        await this.connection.$pool.end()
    }
}