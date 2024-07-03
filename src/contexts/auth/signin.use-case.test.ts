import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Result } from "~/core/result";
import { Email } from "../user/domain/email.value-object";
import { Password } from "../user/domain/password.value-object";
import { User } from "../user/domain/user";
import { UserServiceInterface } from "../user/user.service.interface";
import { JwtService } from "./jwt.service";
import { SigninUseCase } from "./signin.use-case";

describe("SigninUseCase", () => {
    let userService: UserServiceInterface;
    let jwtService: JwtService;
    let signinUseCase: SigninUseCase;

    beforeEach(() => {
        userService = {
            findByEmail: vi.fn(),
            save: vi.fn(),
            exists: vi.fn(),
        };
        // @ts-ignore
        jwtService = {
            generateToken: vi.fn(),
            verifyToken: vi.fn(),
        };
        signinUseCase = new SigninUseCase(userService, jwtService);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should return a token when valid email and password are provided", async () => {
        const email = "test@example.com";
        const password = "password";
        const user = User.create({ email: Email.create(email), password: Password.create(password) });
        const token = "token";

        vi.spyOn(userService, "findByEmail").mockResolvedValue(user);
        user.comparePassword = vi.fn().mockReturnValue(true);
        vi.spyOn(jwtService, "generateToken").mockReturnValue(token);

        const result = await signinUseCase.execute(email, password);

        expect(userService.findByEmail).toHaveBeenCalledWith(email);
        expect(user.comparePassword).toHaveBeenCalledWith(expect.any(Password));
        expect(jwtService.generateToken).toHaveBeenCalledWith({ id: user.id.value });
        expect(result).toEqual(Result.ok(token));
    });

    it("should return a failure result when user is not found", async () => {
        const email = "test@example.com";
        const password = "password";

        vi.spyOn(userService, "findByEmail").mockResolvedValue(null);

        const result = await signinUseCase.execute(email, password);

        expect(userService.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual(Result.fail("User not found"));
    });

    it("should return a failure result when invalid email or password is provided", async () => {
        const email = "test@example.com";
        const password = "password";
        const user = User.create({ email: Email.create(email), password: Password.create(password) });

        vi.spyOn(userService, "findByEmail").mockResolvedValue(user);
        user.comparePassword = vi.fn().mockReturnValue(false);

        const result = await signinUseCase.execute(email, password);

        expect(userService.findByEmail).toHaveBeenCalledWith(email);
        expect(user.comparePassword).toHaveBeenCalledWith(expect.any(Password));
        expect(result).toEqual(Result.fail("Invalid email or password"));
    });

    it("should return a failure result when an error occurs", async () => {
        const email = "test@example.com";
        const password = "password";

        vi.spyOn(userService, "findByEmail").mockRejectedValue(new Error());

        const result = await signinUseCase.execute(email, password);

        expect(userService.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual(Result.fail("Internal server error"));
    });
});

