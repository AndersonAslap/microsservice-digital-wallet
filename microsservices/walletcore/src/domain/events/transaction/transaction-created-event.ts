import { EventInterface } from "../../../../../shared/events/src/interfaces/event";

export class TransactionCreatedEvent implements EventInterface{
    private _name = "TransactionCreatedEvent";
    private _payload: any; 
    private _datetime: Date;

    constructor(payload: any) {
        this._payload = payload;
        this._datetime = new Date();
    }

    getName(): string {
        return this._name;
    }
    
    getDateTime(): Date {
        return this._datetime;
    }
    
    getPayload() {
        return this._payload;
    }
}