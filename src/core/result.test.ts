import { describe, expect, it } from "vitest";
import { Result } from "./result";

describe("Result", () => {
  it("should create a successful result with the provided value", () => {
    const value = "success";
    const result = Result.ok(value);
    expect(result.isSuccess).toBe(true);
    expect(result.data).toBe(value);
    expect(result.error).toBeNull();
  });

  it("should create a failed result with the provided error", () => {
    const error = "failure";
    const result = Result.fail(error);
    expect(result.isSuccess).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBe(error);
  });

  it("should create a successful result with no value", () => {
    const result = Result.ok();
    expect(result.isSuccess).toBe(true);
    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
  });

  it("should create a failed result with no error", () => {
    const result = Result.fail();
    expect(result.isSuccess).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
  });
});