import { AggregateRoot } from "~/shared/core/aggregate-root";
import { UID } from "~/shared/core/id";
import { Email } from "./email.value-object";
import { Password } from "./password.value-object";
import { UserCreatedEvent } from "./user-created.event";
import { PasswordService } from "../infrastructure/service/password.service";

interface UserProps {
    email: Email;
    password: Password;
}
export class User extends AggregateRoot<UserProps> {
    public readonly passwordService: PasswordService = new PasswordService();
    private _hashedPassword: string;
    private constructor(props: UserProps, id?: UID) {
        super(props, id);
        this._hashedPassword = this.passwordService.hash(props.password);
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

    comparePassword(password: Password): boolean {
        return this.passwordService.compare(password, this._hashedPassword);
    }
}
