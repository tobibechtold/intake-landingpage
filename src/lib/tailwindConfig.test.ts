import { describe, expect, it } from "vitest";
import tailwindConfig from "../../tailwind.config";

describe("tailwind config", () => {
  it("includes the typography plugin for prose content", () => {
    expect(tailwindConfig.plugins).toHaveLength(2);
  });
});
