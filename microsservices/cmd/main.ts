import { EventDispatcher } from "../shared/events/src/event-dispatcher";
import { PgPromiseAdapter } from "../walletcore/src/infra/database/pg-promise-adapter";
import { RepositoryFactory } from "../walletcore/src/infra/factory/repository-factory";
import { UsecaseFactory } from "../walletcore/src/infra/factory/usecase-factory";
import { ExpressAdapter } from "../walletcore/src/infra/http/ExpressAdapter";
import { HttpControllerWalletCore } from "../walletcore/src/infra/http/HttpControllerWalletCore";

const eventDispatcher = new EventDispatcher();

const connection = new PgPromiseAdapter();
connection.connect();

const repositoryFactory = new RepositoryFactory(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory, eventDispatcher);

const httpServer = new ExpressAdapter();
new HttpControllerWalletCore(httpServer, usecaseFactory);

httpServer.listen(3030);
