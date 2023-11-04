import { EventInterface } from "./interfaces/event";
import { EventDispatcherInterface } from "./interfaces/event-dispatcher";
import { HandlerInterface } from "./interfaces/handler";

export class EventDispatcher implements EventDispatcherInterface {
    
    private handlers : { [eventName: string] : HandlerInterface[] } = {}

    register(eventName: string, handler: HandlerInterface): void {
        if (!this.handlers[eventName]) 
            this.handlers[eventName] = [];
        if (this.has(eventName, handler)) 
            throw new Error('Handler already exists');
        this.handlers[eventName].push(handler);
    }
    
    unregister(eventName: string, handler: HandlerInterface): void {
        if (this.has(eventName, handler))
            this.handlers[eventName] = this.handlers[eventName].filter((handle) => handle !== handler);
    }
    
    async dispatch(event: EventInterface): Promise<void> {
        if (this.handlers[event.getName()]) {
            await Promise.all(this.handlers[event.getName()].map(handler => handler.handle(event)));
        }
    }
    
    has(eventName: string, handler: HandlerInterface): boolean {
        return this.handlers[eventName] && !!this.handlers[eventName].find((handle) => handle === handler);
    }
    
    clear(): void {
        this.handlers = {};
    }
}