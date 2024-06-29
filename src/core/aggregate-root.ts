import { Entity } from "./entity";
import { UID } from "./id";

export class AggregateRoot<T> extends Entity<T> {
    constructor(props: T, id?: UID) {
        super(props, id);
    }
}