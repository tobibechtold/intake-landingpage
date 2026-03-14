import { describe, expect, it } from "vitest";
import { getWhatsNewEntry, getWhatsNewEntries } from "./whatsNewContent";

describe("whatsNewContent", () => {
  it("loads the seeded German release entry", () => {
    const entry = getWhatsNewEntry("2.1.1", "de");

    expect(entry).toBeDefined();
    expect(entry?.version).toBe("2.1.1");
    expect(entry?.locale).toBe("de");
    expect(entry?.title).toBeTruthy();
    expect(entry?.summary).toBeTruthy();
  });

  it("returns localized entries newest first", () => {
    const entries = getWhatsNewEntries("en");

    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]?.version).toBe("2.1.1");
    expect(entries[0]?.locale).toBe("en");
  });
});
