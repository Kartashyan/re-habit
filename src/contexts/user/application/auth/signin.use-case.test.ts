import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fail, ok } from "~/core/result";
import { Email } from "../../domain/email.value-object";
import { Password } from "../../domain/password.value-object";
import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repo.port";
import { JwtService } from "./jwt.service";
import { SigninUseCase } from "./signin.use-case";

describe("SigninUseCase", () => {
    let userRepo: UserRepository;
    let jwtService: JwtService;
    let signinUseCase: SigninUseCase;

    beforeEach(() => {
        userRepo = {
            findByEmail: vi.fn(),
            save: vi.fn(),
            exists: vi.fn(),
        };
        // @ts-ignore
        jwtService = {
            generateToken: vi.fn(),
            verifyToken: vi.fn(),
        };
        signinUseCase = new SigninUseCase(userRepo, jwtService);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should return a token when valid email and password are provided", async () => {
        const email = "test@example.com";
        const password = "password";
        const user = User.create({ email: Email.create(email), password: Password.create(password) });
        const token = "token";

        vi.spyOn(userRepo, "findByEmail").mockResolvedValue(user);
        user.comparePassword = vi.fn().mockReturnValue(true);
        vi.spyOn(jwtService, "generateToken").mockReturnValue(token);

        const result = await signinUseCase.execute(email, password);

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email);
        expect(user.comparePassword).toHaveBeenCalledWith(expect.any(Password));
        expect(jwtService.generateToken).toHaveBeenCalledWith({ id: user.id.value });
        expect(result).toEqual(ok(token));
    });

    it("should return a failure result when user is not found", async () => {
        const email = "test@example.com";
        const password = "password";

        vi.spyOn(userRepo, "findByEmail").mockResolvedValue(null);

        const result = await signinUseCase.execute(email, password);

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual(fail("User not found"));
    });

    it("should return a failure result when invalid email or password is provided", async () => {
        const email = "test@example.com";
        const password = "password";
        const user = User.create({ email: Email.create(email), password: Password.create(password) });

        vi.spyOn(userRepo, "findByEmail").mockResolvedValue(user);
        user.comparePassword = vi.fn().mockReturnValue(false);

        const result = await signinUseCase.execute(email, password);

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email);
        expect(user.comparePassword).toHaveBeenCalledWith(expect.any(Password));
        expect(result).toEqual(fail("Invalid email or password"));
    });

    it("should return a failure result when an error occurs", async () => {
        const email = "test@example.com";
        const password = "password";

        vi.spyOn(userRepo, "findByEmail").mockRejectedValue(new Error());

        const result = await signinUseCase.execute(email, password);

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual(fail("Internal server error"));
    });
});

