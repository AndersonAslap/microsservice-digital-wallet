import { v4 as uuid } from "uuid";
import { AggregateRoot } from "../worker/aggregate-root";
import { Client } from "./client";

type AccountProps = {
    id?: string;
    client: Client;
    createdAt?: Date;
    updatedAt?: Date;
}

type Operations = {
    type: 'withdraw' | 'deposit',
    amount: number,
    createdAt: Date
}

export class Account implements AggregateRoot {
    private _id: string;
    private _client: Client;
    private _balancer: number;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: AccountProps) {
        this._id = props.id || uuid();
        this._client = props.client;
        this._balancer = 0;
        this._createdAt = props.createdAt || new Date();
        this._updatedAt = props.updatedAt || new Date();
    }

    get id(): string {
        return this._id;
    }

    get client(): Client {
        return this._client;
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
}