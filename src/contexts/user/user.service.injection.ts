import { fail, ok, Result } from "~/shared/core/result";
import { SignupUseCase } from "./application/signup.usecase";
import { UserRepository } from "./domain/user-repo.port";
import { UserModel } from "./domain/user.model";
import { UserLocalMemoryRepositoryAdapter } from "./infrastructure/persistance/user-repo.adapter";
import { UserMapper } from "./infrastructure/user.mapper";
import { SigninUseCase } from "./application/auth/signin.use-case";
import { JwtService } from "./application/auth/jwt.service";

export class UserService {
    private readonly userRepo: UserRepository;
    private readonly signupUseCase: SignupUseCase;
    private readonly signinUseCase: SigninUseCase;

    constructor() {
        this.userRepo = new UserLocalMemoryRepositoryAdapter();
        this.signupUseCase = new SignupUseCase(this.userRepo);
        this.signinUseCase = new SigninUseCase(this.userRepo, new JwtService("secret"));
    }

    async findUserByEmail(email: string): Promise<Result<UserModel>> {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            return fail("User not found");
        }
        return ok(UserMapper.toModel(user));
    }

    signup(command: { email: string, password: string }): Promise<Result<true>> {
        return this.signupUseCase.execute(command);
    }

    signin(command: { email: string, password: string }): Promise<Result<string>> {
        return this.signinUseCase.execute(command.email, command.password);
    }
}
