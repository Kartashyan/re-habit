import { DomainError } from "~/shared/core/domain.error";
import { ValueObject } from "~/shared/core/value-object";
import { PasswordService } from "../infrastructure/service/password.service";
import { Password } from "./password.value-object";


export class HashedPassword extends ValueObject<string> {
    private passwordService: PasswordService;
    constructor(value: string) {
        super(value);
        this.passwordService = new PasswordService();
        if (!this.isValid()) {
            throw new DomainError('Invalid hashed password');
        }
    }

    get value(): string {
        return this.props;
    }

    public compare(password: Password): boolean {
        return this.passwordService.compare(password, this.props);
    }

    isValid(): boolean {
        const hashLength = 60; // bcrypt hash length
        if (this.props.length !== hashLength) {
            return false;
        }
        return true;
    }
}