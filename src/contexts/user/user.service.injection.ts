import { Result } from "~/core/result";
import { SignupUseCase } from "./application/signup.usecase";
import { UserRepository } from "./domain/user-repo.port";
import { UserLocalMemoryRepositoryAdapter } from "./infrastructure/persistance/user-repo.adapter";

export class UserService {
    private readonly userRepo: UserRepository;
    private readonly signupUseCase: SignupUseCase;

    constructor() {
        this.userRepo = new UserLocalMemoryRepositoryAdapter();
        this.signupUseCase = new SignupUseCase(this.userRepo);
    }

    findUserByEmail(email: string) {
        return this.userRepo.findByEmail(email);
    }

    signup(command: { email: string, password: string }): Promise<Result<true>> {
        return this.signupUseCase.execute(command);
    }
}