import { v4 as uuid } from "uuid";
import { DomainException } from "../worker/domain-exception";

type TransactionProps = {
    id?: string;
    accountFromId: string;
    accountToId: string;
    amount: number;
    createdAt?: Date;
}

export class Transaction {
    private _id: string;
    private _accountFromId: string;
    private _accountToId: string;
    private _amount: number
    private _createdAt: Date;

    constructor(props: TransactionProps) {
        this._id = props.id || uuid();
        this._accountFromId = props.accountFromId;
        this._accountToId = props.accountToId;
        this._amount = props.amount;
        this._createdAt = props.createdAt || new Date();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get accountFromId(): string {
        return this._accountFromId;
    }

    get accountToId(): string {
        return this._accountToId;
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