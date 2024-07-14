import { describe, expect, it } from "vitest";
import { User } from "./user.aggregate";
import { Email } from "./email.value-object";
import { Password } from "./password.value-object";

describe("User", () => {
    it("should create a new user when valid credentials", () => {
        // Arrange
        const email = Email.create("test@example.com");
        const password = Password.create("password");

        // Act
        const user = User.create({ email, password });

        // Assert
        expect(user).toBeDefined();
    });
});