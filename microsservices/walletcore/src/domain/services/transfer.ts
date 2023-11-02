import { Account } from "../entity/account";
import { Transaction } from "../entity/transaction";
import { DomainException } from "../worker/domain-exception";

export class TransferDomainService {

    static execute(accountFrom: Account, accountTo: Account, amount: number): Transaction {
        if (amount <= 0) {
            throw new DomainException('Amount must be greater than zero');
        }

        if (!accountFrom.hasSufficientBalance(amount)) {
            throw new DomainException('Insufficient balance');
        }

        const transaction = new Transaction({
            accountFrom,
            accountTo,
            amount
        });

        accountFrom.debit(amount);
        accountTo.credit(amount);

        return transaction;
    }
}