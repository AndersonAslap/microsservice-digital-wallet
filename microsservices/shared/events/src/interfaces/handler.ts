import { EventInterface } from "./event";

export interface HandlerInterface {
    handle(event: EventInterface): Promise<void> 
}