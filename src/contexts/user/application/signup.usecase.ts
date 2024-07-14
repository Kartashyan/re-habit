import { fail, ok, Result } from "~/shared/core/result";
import { Email } from "../domain/email.value-object";
import { Password } from "../domain/password.value-object";
import { UserRepository } from "../domain/user-repo.port";
import { User } from "../domain/user.aggregate";
import { DomainError } from "~/shared/core/domain.error";

type CommandDto = {
    email: string;
    password: string;
}

export class SignupUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(command: CommandDto): Promise<Result<true>> {
        let email: Email;
        let password: Password;
        try {
            email = Email.create(command.email);
            password = Password.create(command.password);
        } catch (e) {
            const error = e as DomainError;
            return fail(error.message);
        }
        console.log("-------email------", email.value);
        const isExist = await this.userRepo.exists(email.value);

        if (isExist) {
            return fail('User already exists');
        }

        const user = User.create({
            email,
            password,
        });

        await this.userRepo.save(user);

        return ok(true);
    }
}