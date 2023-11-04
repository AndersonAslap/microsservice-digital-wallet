import { EventInterface } from "./event";
import { HandlerInterface } from "./handler";

export interface EventDispatcherInterface {
    register(eventName: string, handler: HandlerInterface): void;
    unregister(eventName: string, handler:HandlerInterface): void;
    dispatch(event: EventInterface): void;
    has(eventName: string, handler: HandlerInterface): boolean;
    clear(): void;
}