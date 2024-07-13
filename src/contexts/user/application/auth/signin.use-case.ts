import { DomainError } from "~/core/domain.error";
import { fail, ok, Result } from "~/core/result";
import { Password } from "../../domain/password.value-object";
import { UserRepository } from "../../domain/user-repo.port";
import { JwtService } from "./jwt.service";

export class SigninUseCase {
    private readonly userRepo: UserRepository;
    private jwtService: JwtService;
    constructor(userRepo: UserRepository, jwtService: JwtService){
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async execute(email: string, password: string): Promise<Result<string>> {
        try{
            const user = await this.userRepo.findByEmail(email);
            if (!user) {
                return fail("[signin.use-case]: User not found");
            }
            if (!user.comparePassword(Password.create(password))) {
                return fail("[signin.use-case]: Invalid email or password");
            }

            const token = this.jwtService.generateToken({ id: user.id.value });

            return ok(token);
        } catch (e) {
            if (e instanceof DomainError) {
                return fail(("[signin.use-case]: Invalid email or password"));
            }
            return fail("[signin.use-case]: Internal server error");
        }
    }
}