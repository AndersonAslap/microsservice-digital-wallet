import { v4 as uuid } from 'uuid';
import { AggregateRoot } from "../worker/aggregate-root";
import { DomainException } from "../worker/domain-exception";

type ClientProps = {
    id?: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
} 

export class Client implements AggregateRoot {
    private _id: string;
    private _name: string;
    private _email: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: ClientProps) {
        this._id = props.id || uuid();
        this._name = props.name;
        this._email = props.email;
        this._createdAt = props.createdAt || new Date();
        this._updatedAt = props.updatedAt || new Date();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    validate(): void {
        if (!this._name) throw new DomainException('Name is required');
        if (!this._email) throw new DomainException('Email is required');
    }
}