import { AggregateRoot } from "~/shared/core/aggregate-root";
import { UID } from "~/shared/core/id";
import { Email } from "./email.value-object";
import { HashedPassword } from "./hashed-password.value-object";
import { Password } from "./password.value-object";
import { UserCreatedEvent } from "./user-created.event";

interface UserProps {
    email: Email;
    hashedPassword: HashedPassword;
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

    get password(): HashedPassword {
        return this.props.hashedPassword;
    }

    comparePassword(password: Password): boolean {
        return this.props.hashedPassword.compare(password);
    }
}
