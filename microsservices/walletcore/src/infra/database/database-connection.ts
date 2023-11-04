export interface DatabaseConnection {
    query(statement: string, params: any[]): Promise<any>;
    close(): Promise<void>;
    transaction(operation: (db: any) => Promise<any>): Promise<any>;
    task(operation: (db: any) => Promise<any>): Promise<any>;
}
