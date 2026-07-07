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
    expect(entries[0]?.version).toBe("2.4.4");
    expect(entries[0]?.locale).toBe("en");
  });

  it("renders the 2.4.4 meal, health, and stability improvements in both locales", () => {
    const englishEntry = getWhatsNewEntry("2.4.4", "en");
    const germanEntry = getWhatsNewEntry("2.4.4", "de");

    expect(englishEntry?.title).toBe("What's new in Intake 2.4.4");
    expect(englishEntry?.publishedAt).toBe("2026-07-08");
    expect(englishEntry?.summary).toBe("Faster meal actions, better Health data, and many everyday fixes");
    expect(englishEntry?.bodyHtml).toContain("today's date is now selected by default");
    expect(englishEntry?.bodyHtml).toContain("resting calories calculated by Apple Health");
    expect(englishEntry?.bodyHtml).toContain("activity calories are not included in that base");
    expect(englishEntry?.bodyHtml).toContain("keep the setting that adds activity calories");
    expect(englishEntry?.bodyHtml).toContain("Health Connect integration");

    expect(germanEntry?.title).toBe("Was ist neu in Intake 2.4.4");
    expect(germanEntry?.bodyHtml).toContain("das heutige Datum vorausgewählt");
    expect(germanEntry?.bodyHtml).toContain("Ruhekalorien aus Apple Health");
    expect(germanEntry?.bodyHtml).toContain("Aktivitätskalorien darin nicht enthalten");
    expect(germanEntry?.bodyHtml).toContain("Hinzufügen von Aktivitätskalorien zum Ziel aktiviert lassen");
    expect(germanEntry?.bodyHtml).toContain("Health Connect Integration");
  });

  it("renders the 2.4.3 Intake AI logging improvements in both locales", () => {
    const englishEntry = getWhatsNewEntry("2.4.3", "en");
    const germanEntry = getWhatsNewEntry("2.4.3", "de");

    expect(englishEntry?.title).toBe("What's new in Intake 2.4.3");
    expect(englishEntry?.publishedAt).toBe("2026-06-28");
    expect(englishEntry?.summary).toBe("Smarter Intake AI estimates and faster local food search");
    expect(englishEntry?.bodyHtml).toContain("log an estimate as one meal");
    expect(englishEntry?.bodyHtml).toContain("beverages automatically");
    expect(englishEntry?.bodyHtml).toContain("large local food database");

    expect(germanEntry?.title).toBe("Was ist neu in Intake 2.4.3");
    expect(germanEntry?.bodyHtml).toContain("gemeinsamer Mahlzeiteneintrag");
    expect(germanEntry?.bodyHtml).toContain("Getränke jetzt automatisch");
    expect(germanEntry?.bodyHtml).toContain("große lokale Lebensmitteldatenbanken");
  });

  it("renders the 2.4.2 maintenance fixes in both locales", () => {
    const englishEntry = getWhatsNewEntry("2.4.2", "en");
    const germanEntry = getWhatsNewEntry("2.4.2", "de");

    expect(englishEntry?.title).toBe("What's new in Intake 2.4.2");
    expect(englishEntry?.publishedAt).toBe("2026-06-24");
    expect(englishEntry?.summary).toBe("Gemini own API key (BYOK) and Health Connect fixes");
    expect(englishEntry?.bodyHtml).toContain("Gemini own API key (BYOK)");
    expect(englishEntry?.bodyHtml).toContain("Health Connect");

    expect(germanEntry?.title).toBe("Was ist neu in Intake 2.4.2");
    expect(germanEntry?.bodyHtml).toContain("Gemini mit eigenem API-Schlüssel (BYOK)");
    expect(germanEntry?.bodyHtml).toContain("Health Connect");
  });

  it("renders the 2.4.1 AI chat improvements in both locales", () => {
    const englishEntry = getWhatsNewEntry("2.4.1", "en");
    const germanEntry = getWhatsNewEntry("2.4.1", "de");

    expect(englishEntry?.title).toBe("What's new in Intake 2.4.1");
    expect(englishEntry?.publishedAt).toBe("2026-06-22");
    expect(englishEntry?.bodyHtml).toContain("Speech to text");
    expect(englishEntry?.bodyHtml).toContain("Gemini");
    expect(englishEntry?.bodyHtml).toContain("Terms of Service");

    expect(germanEntry?.title).toBe("Was ist neu in Intake 2.4.1");
    expect(germanEntry?.bodyHtml).toContain("Spracheingabe");
    expect(germanEntry?.bodyHtml).toContain("Gemini");
    expect(germanEntry?.bodyHtml).toContain("Nutzungsbedingungen");
  });

  it("renders the Intake AI BYOK clarification in the 2.4.0 release", () => {
    const entry = getWhatsNewEntry("2.4.0", "en");

    expect(entry?.title).toBe("What's new in Intake 2.4.0");
    expect(entry?.publishedAt).toBe("2026-06-21");
    expect(entry?.bodyHtml).toContain("Own API key (BYOK)");
    expect(entry?.bodyHtml).toContain("basic AI chat flow");
    expect(entry?.bodyHtml).toContain("ChatGPT Plus, ChatGPT Pro, Claude Pro, or Claude Max");
    expect(entry?.bodyHtml).toContain("does not include an API key");
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
