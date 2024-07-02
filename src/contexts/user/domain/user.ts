import { AggregateRoot } from "~/core/aggregate-root";
import { UID } from "~/core/id";
import { Email } from "./email.value-object";
import { Password } from "./password.value-object";
import { UserCreatedEvent } from "./user-created.event";

interface UserProps {
    email: Email;
    password: Password;
}
export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UID) {
        super(props, id);
    }
    public static create(props: UserProps, id?: UID): User {
        const isNew = id ? false : true;
        const user = new User(props, id);
        if (isNew) {
            user.addDomainEvent(new UserCreatedEvent(user));
        }
        return user;
    }

    get email(): Email {
        return this.props.email;
    }

    get password(): Password {
        return this.props.password;
    }
}
