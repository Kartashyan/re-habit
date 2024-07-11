import { fail, ok, Result } from "~/core/result";
import { UserServiceInterface } from "../user/user.service.interface";
import { JwtService } from "./jwt.service";
import { Password } from "../user/domain/password.value-object";
import { Either } from "~/core/either";
import { DomainError } from "~/core/domain.error";

export class SigninUseCase {
    private userService: UserServiceInterface;
    private jwtService: JwtService;
    constructor(userService: UserServiceInterface, jwtService: JwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async execute(email: string, password: string): Promise<Result<string>> {
        try{
            const user = await this.userService.findByEmail(email);
            if (!user) {
                return fail("User not found");
            }
            if (!user.comparePassword(Password.create(password))) {
                return fail("Invalid email or password");
            }

            const token = this.jwtService.generateToken({ id: user.id.value });

            return ok(token);
        } catch (e) {
            if (e instanceof DomainError) {
                return fail(("Invalid email or password"));
            }
            return fail("Internal server error");
        }
    }
}