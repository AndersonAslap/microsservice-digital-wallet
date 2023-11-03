import { v4 as uuid } from "uuid";
import { Account } from "./account"
import { DomainException } from "../worker/domain-exception";

type TransactionProps = {
    id?: string;
    accountFrom: Account;
    accountTo: Account;
    amount: number;
    createdAt?: Date;
}

export class Transaction {
    readonly _id: string;
    readonly _accountFrom: Account;
    readonly _accountTo: Account;
    readonly _amount: number
    readonly _createdAt: Date;

    constructor(props: TransactionProps) {
        this._id = props.id || uuid();
        this._accountFrom = props.accountFrom;
        this._accountTo = props.accountTo;
        this._amount = props.amount;
        this._createdAt = props.createdAt || new Date();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    validate() {
        if (this._amount <= 0) throw new DomainException('Amount cannot be less or equal to zero');
    }
}