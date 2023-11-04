import pgPromise from 'pg-promise';
import { IDatabase, ITask } from 'pg-promise';
import { DatabaseConnection } from "./database-connection";

const pgp = pgPromise();

export class PgPromiseAdapter implements DatabaseConnection {
    private db: IDatabase<any>;

    constructor() {
        this.db = pgp('postgres://postgres:postgres@localhost:5432/wallet_db');
    }

    async query(statement: string, params: any): Promise<any> {
        return this.db.query(statement, params);
    }

    async close(): Promise<void> {
        await this.db.$pool.end();
    }

    // Método para iniciar uma transação
    async transaction(operation: (db: ITask<any>) => Promise<any>): Promise<void> {
        return this.db.tx(operation);
    }

    // Método para iniciar uma task
    async task(operation: (db: ITask<any>) => Promise<any>): Promise<void> {
        return this.db.task(operation);
    }
}
