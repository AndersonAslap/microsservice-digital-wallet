import { UsecaseFactoryInterface } from "../../application/factory/usecase-factory-interface"
import { HttpServer } from "./HttpServer"

export class HttpControllerWalletCore {

    constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactoryInterface) {

        httpServer.on('post', '/clients', async (params:any, body:any, headers:any) => {
            const usecase = usecaseFactory.createClientUseCase();
            const output = await usecase.execute(body);
            return output
        });

        httpServer.on('post', '/accounts', async (params:any, body:any, headers:any) => {
            const usecase = usecaseFactory.createAccountUseCase();
            const output = await usecase.execute(body);
            return output
        });

        httpServer.on('post', '/transactions', async (params:any, body:any, headers:any) => {
            const usecase = usecaseFactory.createTransactionUseCase();
            const output = await usecase.execute(body);
            return output
        });
    }
}