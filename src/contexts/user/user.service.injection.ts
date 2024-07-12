import { fail, ok, Result } from "~/core/result";
import { SignupUseCase } from "./application/signup.usecase";
import { UserRepository } from "./domain/user-repo.port";
import { UserModel } from "./domain/user.model";
import { UserLocalMemoryRepositoryAdapter } from "./infrastructure/persistance/user-repo.adapter";
import { UserMapper } from "./infrastructure/user.mapper";

export class UserService {
    private readonly userRepo: UserRepository;
    private readonly signupUseCase: SignupUseCase;

    constructor() {
        this.userRepo = new UserLocalMemoryRepositoryAdapter();
        this.signupUseCase = new SignupUseCase(this.userRepo);
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
}
