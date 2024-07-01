import { AggregateRoot } from "~/core/aggregate-root";
import { UID } from "~/core/id";
import { UserCreatedEvent } from "./user-created.event";
import { Result } from "~/core/result";

interface UserProps {
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
        console.log("----in the user entity----", user);
        if (isNew) {
            user.addDomainEvent(new UserCreatedEvent(user));
        }
        return Result.ok(user);
    }
}