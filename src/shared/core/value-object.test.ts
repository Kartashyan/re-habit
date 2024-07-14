import { describe, expect, it } from "vitest";
import { ValueObject } from "./value-object";

describe("ValueObject", () => {
  it("should create a value object with the provided value", () => {
    const value = { name: "John", age: 30 };
    const vo = new ValueObject(value);
    expect(vo.getProps()).toEqual(value);
  });

  it("should return true when comparing two value objects with the same value", () => {
    const value = { name: "John", age: 30 };
    const vo1 = new ValueObject(value);
    const vo2 = new ValueObject(value);
    expect(vo1.equals(vo2)).toBe(true);
  });

  it("should return false when comparing two value objects with different values", () => {
    const value1 = { name: "John", age: 30 };
    const value2 = { name: "Jane", age: 25 };
    const vo1 = new ValueObject(value1);
    const vo2 = new ValueObject(value2);
    expect(vo1.equals(vo2)).toBe(false);
  });

  it("should return false when comparing with null or undefined", () => {
    const value = { name: "John", age: 30 };
    const vo = new ValueObject(value);
    expect(vo.equals(undefined)).toBe(false);
  });
});