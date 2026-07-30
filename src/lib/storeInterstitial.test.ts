import { describe, expect, it } from "vitest";
import { buildStoreInterstitial } from "./storeInterstitial";

const STORE_URL = "https://apps.apple.com/de/app/id6757768955?pt=128030281&ct=ugc-lisa-1&mt=8";

describe("buildStoreInterstitial", () => {
  it("links the store URL as the primary action", () => {
    const html = buildStoreInterstitial({ storeUrl: STORE_URL, language: "de" });
    expect(html).toContain(`href="${STORE_URL.replace(/&/g, "&amp;")}"`);
  });

  it("renders German copy for de", () => {
    const html = buildStoreInterstitial({ storeUrl: STORE_URL, language: "de" });
    expect(html).toContain('lang="de"');
    expect(html).toContain("Im App Store öffnen");
  });

  it("renders English copy for en", () => {
    const html = buildStoreInterstitial({ storeUrl: STORE_URL, language: "en" });
    expect(html).toContain('lang="en"');
    expect(html).toContain("Open in the App Store");
  });

  // The button is dead in the very browser this page exists for, so the manual
  // route out has to be on screen rather than hidden behind a "didn't work?" link.
  it("always shows the open-in-browser escape instructions", () => {
    for (const language of ["de", "en"] as const) {
      const html = buildStoreInterstitial({ storeUrl: STORE_URL, language });
      expect(html).toContain("⋯");
    }
  });

  it("offers the copy-link fallback", () => {
    const html = buildStoreInterstitial({ storeUrl: STORE_URL, language: "en" });
    expect(html).toContain("Copy link");
    expect(html).toContain(JSON.stringify(STORE_URL));
  });

  // Slugs reaching this point are already pattern-checked, so this is defence in
  // depth rather than a live hole — but the URL is interpolated into markup.
  it("escapes markup characters in the store URL", () => {
    const html = buildStoreInterstitial({
      storeUrl: 'https://apps.apple.com/de/app/id1?ct="><script>alert(1)</script>',
      language: "en",
    });
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&quot;&gt;&lt;script&gt;");
  });

  it("does not navigate on load, so the page can never blank out", () => {
    const html = buildStoreInterstitial({ storeUrl: STORE_URL, language: "de" });
    expect(html).not.toContain("location.href =");
    expect(html).not.toContain("location.replace");
  });
});
