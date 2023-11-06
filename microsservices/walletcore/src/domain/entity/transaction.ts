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
    private _id: string;
    private _accountFrom: Account;
    private _accountTo: Account;
    private _amount: number
    private _createdAt: Date;

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

    get accountFrom(): Account {
        return this._accountFrom;
    }

    get accountTo(): Account {
        return this._accountTo;
    }

    get amount(): number {
        return this._amount;
    }

    get createAt(): Date {
        return this._createdAt;
    }

    validate() {
        if (this._amount <= 0) throw new DomainException('Amount cannot be less or equal to zero');
    }
}