import { Result } from "~/core/result";
import { Email } from "../domain/email.value-object";
import { Password } from "../domain/password.value-object";
import { UserRepository } from "../domain/user-repo.port";
import { User } from "../domain/user";
import { SignupUseCase } from "./signup.usecase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UID } from "~/core/id";

describe("SignupUseCase", () => {
    let userRepo: UserRepository;
    let signupUseCase: SignupUseCase;

    beforeEach(() => {
        userRepo = {
            findByEmail: vi.fn(),
            save: vi.fn(),
            exists: vi.fn(),
        };
        signupUseCase = new SignupUseCase(userRepo);
    });

    it("should return a failed result if email or password is invalid", async () => {
        const email = "invalid-email";
        const password = "invps";
        const result = await signupUseCase.execute(email, password);
        expect(result.isSuccess).toBe(false);
        expect(result.error).toBe("Email or password is invalid");
    });

    it("should return a failed result if user already exists", async () => {
        const email = "existing-email@example.com";
        const password = "valid-password";
        vi.spyOn(userRepo, "exists").mockResolvedValue(true);
        const result = await signupUseCase.execute(email, password);
        expect(result.isSuccess).toBe(false);
        expect(result.error).toBe("User already exists");
    });

    it("should return a failed result if user creation fails", async () => {
        const email = "valid-email@example.com";
        const password = "valid-password";
        const userCreationError = "User creation failed";
        User.create = vi.fn().mockReturnValue(Result.fail(userCreationError));
        const result = await signupUseCase.execute(email, password);
        expect(result.isSuccess).toBe(false);
        expect(result.error).toBe(userCreationError);
    });

    it("should save the user and return a successful result", async () => {
        const email = "valid-email@example.com";
        const password = "valid-password";
        const user = User.create({ email, password }).data;
        vi.spyOn(userRepo, "save").mockResolvedValue();
        const result = await signupUseCase.execute(email, password);
        expect(result.isSuccess).toBe(true);
        expect(userRepo.save).toHaveBeenCalledWith(user);
    });
});