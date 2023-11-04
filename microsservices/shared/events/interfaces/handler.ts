import { Event } from "./event";

export interface Handler {
    handle(event: Event): void 
}