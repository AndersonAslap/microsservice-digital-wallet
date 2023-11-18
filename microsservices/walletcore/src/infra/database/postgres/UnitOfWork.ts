import { DataSource, QueryRunner } from "typeorm"

export class UnitOfWork {

    readonly queryRunner: QueryRunner

    public constructor(dataSource: DataSource) {
        this.queryRunner = dataSource.createQueryRunner();
        this.queryRunner.connect();
    }

    async start() {
        await this.queryRunner.startTransaction()
    }

    async commit() {
        await this.queryRunner.commitTransaction();
        await this.queryRunner.release()
    }

    async rollback() {
        await this.queryRunner.rollbackTransaction();
        await this.queryRunner.release()
    }

}