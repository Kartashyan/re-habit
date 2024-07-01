
import { Result } from "~/core/result";
import { ValueObject } from "~/core/value-object";

export class Email extends ValueObject<string> {
    private constructor(email: string) {
        super(email);
    }

    public static create(email: string): Result<Email> {
        if (!Email.validate(email)) {
            Result.fail('Invalid email');
        }

        return Result.ok(new Email(email));
    }

    private static validate(email: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}