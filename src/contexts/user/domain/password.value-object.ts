import { Result } from "~/core/result";
import { ValueObject } from "~/core/value-object";

type PasswordValueObjectProps = {
    value: string;
};

export class Password extends ValueObject<PasswordValueObjectProps> {
    private constructor(props: PasswordValueObjectProps) {
        super(props);
    }

    public static create(value: string): Result<Password> {
        if (!Password.isValid(value)) {
            return Result.fail<Password>('Invalid password');
        }

        return Result.ok(new Password({
            value,
        }));
    }

    public get value(): string {
        return this.props.value;
    }

    private static isValid(password: string): boolean {
        return password.length >= 6;
    }
}