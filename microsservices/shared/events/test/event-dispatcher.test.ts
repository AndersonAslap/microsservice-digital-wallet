import { EventDispatcher } from "../src/event-dispatcher";
import { EventInterface } from "../src/interfaces/event";
import { HandlerInterface } from "../src/interfaces/handler";

const event: EventInterface = {
    getDateTime(): Date {
        return new Date();
    },

    getName(): string {
        return "eventPlaceOrder";
    },

    getPayload(): any {
        return {
            name: 'anderson',
            status: 'paid',
            email: 'anderson@gmail.com'
        }
    }, 

    setPayload(): void {}
}

const handler : HandlerInterface = {
    async handle(event) {
        let payload = event.getPayload();
        console.log(`${payload.name}, foi enviado um email para o endereço ${payload.email}`);
    },
}

test("should throw error when handler already exists in event", () => {
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(event.getName(), handler);
    expect(
        () => eventDispatcher.register(event.getName(), handler)
    ).toThrow('Handler already exists');
});

test("should register an event and add a handler in event", () => {
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(event.getName(), handler);
    expect(eventDispatcher.has(event.getName(), handler)) .toBeTruthy();
});

test("should unregister a handler in event", () => {
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(event.getName(), handler);
    eventDispatcher.unregister(event.getName(), handler);
    expect(eventDispatcher.has(event.getName(), handler)) .toBeFalsy();
});

test("should exec all handler of event", () => {
    const spy = jest.spyOn(handler, 'handle');
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(event.getName(), handler);
    eventDispatcher.dispatch(event);
    expect(spy).toHaveBeenCalledTimes(1);
});