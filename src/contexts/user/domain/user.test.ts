import { describe, expect, it } from "vitest";
import { User } from "./user";
import { UserCreatedEvent } from "./user-created.event";
import { Result } from "~/core/result";
import { UID } from "~/core/id";

describe("User", () => {
  it("should create a new user with the provided properties", () => {
    // Arrange
    const props = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    // Act
    const result = User.create(props);

    // Assert
    expect(result.isSuccess).toBe(true);
    expect(result.data).toBeInstanceOf(User);
    expect(result.data?.props).toEqual(props);
    expect(result.data?.domainEvents).toHaveLength(1);
    expect(result.data?.domainEvents[0]).instanceOf(UserCreatedEvent);
  });

  it("should create a new user with the provided properties and ID", () => {
    // Arrange
    const props = {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
    };
    const id = "12345";

    // Act
    const result = User.create(props, new UID(id));

    // Assert
    expect(result.isSuccess).toBe(true);
    expect(result.data).toBeInstanceOf(User);
    expect(result.data?.props).toEqual(props);
    expect(result.data?.id.value).toBe(id);
    expect(result.data?.domainEvents).toEqual([]);
  });
});