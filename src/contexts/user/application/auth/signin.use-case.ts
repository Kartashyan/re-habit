import { DomainError } from "~/shared/core/domain.error";
import { fail, ok, Result } from "~/shared/core/result";
import { Password } from "../../domain/password.value-object";
import { UserRepository } from "../../domain/user-repo.port";
import { User } from "../../domain/user.aggregate";
import { JwtService } from "./jwt.service";
import { HashedPassword } from "../../domain/hashed-password.value-object";
import { Email } from "../../domain/email.value-object";

export class SigninUseCase {
    private readonly userRepo: UserRepository;
    constructor(userRepo: UserRepository){
        this.userRepo = userRepo;
    }
    async execute(email: string, password: string): Promise<Result<User>> {
        try{
            const user = await this.userRepo.findByEmail(Email.create(email).value);
            if (!user) {
                return fail("[signin.use-case]: User not found");
            }
            if (!user.comparePassword(Password.create(password))) {
                return fail("[signin.use-case]: Invalid email or password");
            }

            return ok(user);
        } catch (e) {
            if (e instanceof DomainError) {
                return fail(("[signin.use-case]: Invalid email or password"));
            }
            return fail("[signin.use-case]: Internal server error");
        }
    }
}