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

  it("renders embedded mp4 markdown media as a video block", () => {
    const entry = getWhatsNewEntry("2.1.1", "de");

    expect(entry?.bodyHtml).toContain("<video");
    expect(entry?.bodyHtml).toContain("share-recipes.mp4");
    expect(entry?.bodyHtml).toContain("autoplay");
    expect(entry?.bodyHtml).toContain("loop");
    expect(entry?.bodyHtml).toContain("muted");
    expect(entry?.bodyHtml).toContain("playsinline");
    expect(entry?.bodyHtml).not.toContain('img src="/src/content/whats-new/2.1.1/assets/share-recipes.mp4');
  });

  it("keeps non-video english release content free of unintended image blocks", () => {
    const entry = getWhatsNewEntry("2.1.1", "en");

    expect(entry?.bodyHtml).not.toContain("<img");
    expect(entry?.bodyHtml).toContain("share-recipes.mp4");
    expect(entry?.bodyHtml).toContain("macro-distribution.mp4");
  });
});
