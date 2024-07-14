import { DomainEvent } from "~/shared/core/domain-event";
import { User } from "./user.aggregate";

export class UserCreatedEvent implements DomainEvent<User> {
    public readonly name = "user.created";
    public readonly occuredAt = new Date();
    public readonly aggregate: User;

    constructor(user: User) {
        this.aggregate = user;
    }
}
