import { DataSource } from "typeorm"
import { CreateTableClient1699142622358 } from "./migration/1699142622358-CreateTableClient"
import { CreateTableAccount1699142672507 } from "./migration/1699142672507-CreateTableAccount"
import { CreateTableTransaction1699142681195 } from "./migration/1699142681195-CreateTableTransaction"
import { ClientEntityOrm } from "./entity/Client"
import { AccountEntityOrm } from "./entity/Account"
import { TransactionEntityOrm } from "./entity/Transaction"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "wallet_db",
    synchronize: true,
    logging: false,
    entities: [
        ClientEntityOrm,
        AccountEntityOrm,
        TransactionEntityOrm
    ],
    migrations: [
        CreateTableClient1699142622358,
        CreateTableAccount1699142672507,
        CreateTableTransaction1699142681195
    ]
})
