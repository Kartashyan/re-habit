import { Result } from "~/core/result";
import { Either } from "./either";
import { describe, expect, it } from "vitest";

describe("Result", () => {
  it("should create a successful result", () => {
    // Arrange
    const value = "success";

    // Act
    const result = Result.ok(value);

    // Assert
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(value);
  });

  it("should create a failed result", () => {
    // Arrange
    const error = "failure";

    // Acts
    const result = Result.fail(error);

    // Assert
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBe(error);
  });

  it("should combine multiple successful results", () => {
    // Arrange
    const results: Either<any, any>[] = [
      Result.ok("result1"),
      Result.ok("result2"),
      Result.ok("result3"),
    ];

    // Act
    const combinedResult = Result.combine(results);

    // Assert
    expect(combinedResult.isRight()).toBe(true);
    expect(combinedResult.value).toBe(null);
  });

  it("should return the first failed result when combining results", () => {
    // Arrange
    const error1 = "error1";
    const error2 = "error2";
    const results: Either<any, any>[] = [
      Result.ok("result1"),
      Result.fail(error1),
      Result.fail(error2),
    ];

    // Act
    const combinedResult = Result.combine(results);

    // Assert
    expect(combinedResult.isLeft()).toBe(true);
    expect(combinedResult.value).toBe(error1);
  });
});