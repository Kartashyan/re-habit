import { Result } from "~/core/result";
import { Email } from "../domain/email.value-object";
import { Password } from "../domain/password.value-object";
import { UserRepository } from "../domain/user-repo.port";
import { User } from "../domain/user";
import { DomainError } from "~/core/domain.error";

type CommandDto = {
    email: string;
    password: string;
}

export class SignupUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(command: CommandDto): Promise<Result> {
        let email: Email;
        let password: Password;
        try {
            email = Email.create(command.email);
            password = Password.create(command.password);
        } catch (e) {
            const error = e as DomainError;
            return Result.fail(error.message);
        }
        console.log("-------email------", email.value);
        const isExist = await this.userRepo.exists(email.value);

        if (isExist) {
            return Result.fail('User already exists');
        }

        const user = User.create({
            email,
            password,
        });

        await this.userRepo.save(user);

        return Result.ok(true);
    }
}