import "reflect-metadata";
import { EventDispatcher } from "../../shared/events/src/event-dispatcher";
import { RepositoryFactory } from "./infra/factory/repository-factory";
import { UsecaseFactory } from "./infra/factory/usecase-factory";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { HttpControllerWalletCore } from "./infra/http/HttpControllerWalletCore";
import { AppDataSource } from "./infra/database/postgres/orm/data-source";
import { MapperFactory } from "./infra/factory/mapper-factory";

async function main() {
    try {
        const dataSource = await AppDataSource.initialize();
        const eventDispatcher = new EventDispatcher();
        const repositoryFactory = new RepositoryFactory(dataSource);
        const mapperFactory = new MapperFactory();
        const usecaseFactory = new UsecaseFactory(repositoryFactory, mapperFactory, eventDispatcher, dataSource);
        const httpServer = new ExpressAdapter();
        new HttpControllerWalletCore(httpServer, usecaseFactory);
        httpServer.listen(3031);
    } catch(error) {
        console.error("Error during Data Source initialization", error);
    }
}

main();