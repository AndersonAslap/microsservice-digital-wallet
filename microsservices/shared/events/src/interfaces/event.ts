export interface EventInterface {
    getName(): string
    getDateTime(): Date 
    getPayload(): any
    setPayload(payload:any): void
}