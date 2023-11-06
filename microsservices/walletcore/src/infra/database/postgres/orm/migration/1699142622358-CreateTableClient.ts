import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableClient1699142622358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE clients (
                id VARCHAR PRIMARY KEY,
                _id UUID UNIQUE,
                name VARCHAR NOT NULL,
                email VARCHAR UNIQUE NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS clients;`);
    }

}
