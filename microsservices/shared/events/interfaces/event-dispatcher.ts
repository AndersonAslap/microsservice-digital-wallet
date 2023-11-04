import { Event } from "./event";
import { Handler } from "./handler";

export interface EventDispatcher {
    register(eventName: string, handler: Handler): void;
    unregister(eventName: string, handler:Handler): void;
    dispatch(event: Event): void;
    has(eventName: string, handler: Handler): boolean;
    clear(): void;
}