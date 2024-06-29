import { describe, expect, it } from "vitest";
import { Entity } from "./entity";
import { UID } from "./id";

describe("Entity", () => {
  it("should create an entity with a unique ID", () => {
    const entity = new Entity({ name: "John" });
    expect(entity.id).toBeInstanceOf(UID);
  });

  it("should create an entity with the provided ID", () => {
    const id = new UID();
    const entity = new Entity({ name: "John" }, id);
    expect(entity.id).toBe(id);
  });

  it("should return true when comparing two entities with the same ID", () => {
    const id = new UID();
    const entity1 = new Entity({ name: "John" }, id);
    const entity2 = new Entity({ name: "John" }, id);
    expect(entity1.equals(entity2)).toBe(true);
  });

  it("should return false when comparing two entities with different IDs", () => {
    const entity1 = new Entity({ name: "John" });
    const entity2 = new Entity({ name: "John" });
    expect(entity1.equals(entity2)).toBe(false);
  });

  it("should return false when comparing with null or undefined", () => {
    const entity = new Entity({ name: "John" });
    expect(entity.equals(undefined)).toBe(false);
  });

});