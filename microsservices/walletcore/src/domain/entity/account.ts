import { v4 as uuid } from "uuid";
import { AggregateRoot } from "../worker/aggregate-root";
import { DomainException } from "../worker/domain-exception";

type AccountProps = {
    id?: string;
    clientId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Account implements AggregateRoot {
    private _id: string;
    private _clientId: string;
    private _balancer: number;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: AccountProps) {
        this._id = props.id || uuid();
        this._clientId = props.clientId;
        this._balancer = 0;
        this._createdAt = props.createdAt || new Date();
        this._updatedAt = props.updatedAt || new Date();
    }

    get id(): string {
        return this._id;
    }

    get clientId(): string {
        return this._clientId;
    }

    get balancer(): number {
        return this._balancer;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    credit(amount: number) {
        if (amount < 0) throw new DomainException('Amount cannot be less or equal to zero');
        this._balancer +=  amount;
        this._updatedAt = new Date();
    }

    debit(amount: number) {
        if (amount <= 0) throw new DomainException('Amount cannot be less or equal to zero');
        if (this._balancer < amount) throw new DomainException('Insufficient balance');
        this._balancer -= amount;
        this._updatedAt = new Date();
    }

    hasSufficientBalance(amount:number): boolean {
        return this._balancer >= amount;
    }
}