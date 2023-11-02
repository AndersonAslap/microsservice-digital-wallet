import { Account } from "../../src/domain/entity/account"
import { Client } from "../../src/domain/entity/client";
import { Transaction } from "../../src/domain/entity/transaction";
import { TransferDomainService } from "../../src/domain/services/transfer";

test.each(
    [0, -100]
)("should throw error when amount less or equal to zero", (amount: number) => {
    const clientAccountFrom = new Client({name: 'Anderson', email: 'anderson@dev.io'});
    const accountFrom = new Account({client: clientAccountFrom});
    accountFrom.credit(30);
    
    const clientAccountTo = new Client({name: 'Anderson', email: 'anderson@dev.io'});
    const accountTo = new Account({client: clientAccountTo});
    accountTo.credit(30);

    expect(
        () => new Transaction({
            accountFrom,
            accountTo,
            amount
        })
    ).toThrow('Amount cannot be less or equal to zero')
});

test("should make a transaction", () => {
    const clientAccountFrom = new Client({name: 'Anderson', email: 'anderson@dev.io'});
    const accountFrom = new Account({client: clientAccountFrom});
    accountFrom.credit(30);
    
    const clientAccountTo = new Client({name: 'Anderson', email: 'anderson@dev.io'});
    const accountTo = new Account({client: clientAccountTo});
    accountTo.credit(30);
    
    const transaction = TransferDomainService.execute(accountFrom, accountTo, 15);

    expect(transaction._accountFrom.balancer).toBe(15);
    expect(transaction._accountTo.balancer).toBe(45);
})