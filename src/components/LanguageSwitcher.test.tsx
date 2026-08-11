import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * The switcher used to call navigate() and these tests asserted on the resulting
 * router location. It is a plain anchor now: every route is a static document, so
 * switching locale is an ordinary navigation and the destination is computed at build
 * time from the page's hreflang pair. The behaviour worth testing is therefore the
 * href it renders, not a client-side navigation that no longer happens.
 */
const renderWith = (lang: "de" | "en", alternateHref: string | null) =>
  render(
    <LanguageProvider lang={lang} alternateHref={alternateHref}>
      <LanguageSwitcher />
    </LanguageProvider>,
  );

describe("LanguageSwitcher", () => {
  it("links to the English counterpart from a German page", () => {
    renderWith("de", "/en/features");
    expect(screen.getByRole("link", { name: "Switch to English" })).toHaveAttribute(
      "href",
      "/en/features",
    );
  });

  it("links to the German counterpart from an English page", () => {
    renderWith("en", "/funktionen");
    expect(screen.getByRole("link", { name: "Switch to German" })).toHaveAttribute(
      "href",
      "/funktionen",
    );
  });

  it("preserves a What's New version across locales", () => {
    renderWith("de", "/en/whats-new/2.1.1");
    expect(screen.getByRole("link", { name: "Switch to English" })).toHaveAttribute(
      "href",
      "/en/whats-new/2.1.1",
    );
  });

  it("preserves a comparison slug across locales", () => {
    renderWith("de", "/en/comparisons/yazio-alternative");
    expect(screen.getByRole("link", { name: "Switch to English" })).toHaveAttribute(
      "href",
      "/en/comparisons/yazio-alternative",
    );
  });

  // The delegated listener in src/scripts/bootstrap.ts reads this to pin the visitor's
  // choice in the intake_lang cookie, which suppresses the root locale redirect.
  it("marks the target locale so the cookie can be pinned on click", () => {
    renderWith("de", "/en");
    expect(screen.getByRole("link", { name: "Switch to English" })).toHaveAttribute(
      "data-language-switch",
      "en",
    );
  });

  it("renders nothing when the page has no counterpart in the other locale", () => {
    const { container } = renderWith("de", null);
    expect(container).toBeEmptyDOMElement();
  });
});
