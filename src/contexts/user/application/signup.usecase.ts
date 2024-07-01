import { Result } from "~/core/result";
import { Email } from "../domain/email.value-object";
import { Password } from "../domain/password.value-object";
import { UserRepository } from "../domain/user-repo.port";
import { User } from "../domain/user";

export class SignupUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(email: string, password: string): Promise<Result<void>> {
        const passwordOrError = Password.create(password);
        const emailOrError = Email.create(email);
        if ([passwordOrError.isSuccess, emailOrError.isSuccess].includes(false)) {
            return Result.fail('Email or password is invalid');
        }

        const isExist = await this.userRepo.exists(email);

        if (isExist) {
            return Result.fail('User already exists');
        }
        const userOrError = User.create({
            email,
            password,
        });
        console.log("----42----", userOrError.data);
        if (!userOrError.isSuccess) {
            return Result.fail(userOrError.error);
        }

        if (userOrError.data) {
            await this.userRepo.save(userOrError.data);
        }
        return Result.ok();
    }
}