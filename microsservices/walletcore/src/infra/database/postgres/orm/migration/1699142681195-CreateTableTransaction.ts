import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableTransaction1699142681195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                CREATE TABLE transactions (
                id VARCHAR PRIMARY KEY,
                _id UUID UNIQUE,
                accountFrom_id UUID NOT NULL,
                accountTo_id UUID NOT NULL,
                amount int,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                FOREIGN KEY (accountFrom_id) REFERENCES accounts (_id),
                FOREIGN KEY (accountTo_id) REFERENCES accounts (_id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS clients;`);
    }

}
