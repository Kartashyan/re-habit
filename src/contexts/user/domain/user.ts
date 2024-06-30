import { AggregateRoot } from "~/core/aggregate-root";
import { UID } from "~/core/id";
import { UserCreatedEvent } from "./user-created.event";
import { Result } from "~/core/result";

interface UserProps {
    name: string;
    email: string;
    password: string;
}
export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UID) {
        super(props, id);
    }
    public static create(props: UserProps, id?: UID): Result<User> {
        const isNew = id ? false : true;
        const user = new User(props, id);
        if (isNew) {
            user.addDomainEvent(new UserCreatedEvent(user));
        }
        return Result.ok(user);
    }
}