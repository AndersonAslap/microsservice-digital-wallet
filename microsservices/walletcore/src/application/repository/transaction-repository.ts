import { Transaction } from "../../domain/entity/transaction";

export interface TransactionRepository {
    findById(id: string): Promise<Transaction>;
    save(transaction: Transaction): Promise<void>;
}