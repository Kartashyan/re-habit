import { DomainEvent } from "./domain-event";
import { Entity } from "./entity";
import { UID } from "./id";
import { LocalEventManager } from "./local-event-manager";

export class AggregateRoot<T> extends Entity<T> {
    protected _domainEvents: DomainEvent<AggregateRoot<T>>[];
    constructor(props: T, id?: UID) {
        super(props, id);
        this._domainEvents = [];
    }

    public addDomainEvent(event: DomainEvent<AggregateRoot<T>>): void {
        this._domainEvents.push(event);
    }

    dispatchDomainEvents(emitter: LocalEventManager = LocalEventManager.getInstance()): void {
        this._domainEvents.forEach((event) => {
            emitter.dispatch(event.name, event);
        });
        this._domainEvents = [];
    }
}