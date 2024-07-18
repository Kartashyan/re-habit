import { DomainError } from "~/shared/core/domain.error";
import { ValueObject } from "~/shared/core/value-object";
import { PasswordService } from "../infrastructure/service/password.service";
import { HashedPassword } from "./hashed-password.value-object";

type PasswordValueObjectProps = {
    value: string;
};

export class Password extends ValueObject<PasswordValueObjectProps> {
    private passwordService: PasswordService;
    private constructor(props: PasswordValueObjectProps) {
        super(props);
        this.passwordService = new PasswordService();
    }

    public static create(value: string): Password {
        if (!Password.isValid(value)) {
            throw new DomainError('Invalid password');
        }

        return new Password({
            value,
        });
    }

    public get value(): string {
        return this.props.value;
    }

    public hash(): HashedPassword {
        return new HashedPassword(this.passwordService.hash(this));
    }

    private static isValid(password: string): boolean {
        return password.length >= 6;
    }
}