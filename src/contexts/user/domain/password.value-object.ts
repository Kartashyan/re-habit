import { DomainError } from "~/shared/core/domain.error";
import { ValueObject } from "~/shared/core/value-object";

type PasswordValueObjectProps = {
    value: string;
};

export class Password extends ValueObject<PasswordValueObjectProps> {
    private constructor(props: PasswordValueObjectProps) {
        super(props);
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

    private static isValid(password: string): boolean {
        return password.length >= 6;
    }
}