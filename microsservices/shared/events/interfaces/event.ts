export interface Event {
    getName(): string
    getDateTime(): Date 
    getPayload(): any
}