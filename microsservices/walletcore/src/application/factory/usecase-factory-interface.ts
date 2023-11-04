import { CreateAccount } from "../usecases/create-account";
import { CreateClient } from "../usecases/create-client";
import { CreateTransaction } from "../usecases/create-transaction";

export interface UsecaseFactoryInterface {
    createClientUseCase(): CreateClient;
    createAccountUseCase(): CreateAccount;
    createTransactionUseCase(): CreateTransaction;
}