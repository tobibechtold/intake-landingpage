import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import PressMentions from "./PressMentions";

const renderPressMentions = (initialEntry: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <PressMentions />
      </LanguageProvider>
    </MemoryRouter>
  );

describe("PressMentions", () => {
  it("renders the localized German press label and direct article links", () => {
    renderPressMentions("/");

    expect(screen.getByText("Bekannt aus")).toBeInTheDocument();
    expect(screen.getByText("iPhone-Ticker")).toBeInTheDocument();
    expect(screen.getByText("iTopnews")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /iphone-ticker: intake: neuer kalorienzähler/i })
    ).toHaveAttribute(
      "href",
      "https://www.iphone-ticker.de/intake-neuer-kalorienzaehler-ohne-abo-ohne-coaches-ohne-ballast-274552/"
    );
    expect(
      screen.getByRole("link", { name: /itopnews: intake: kalorien zählen ohne abo/i })
    ).toHaveAttribute(
      "href",
      "https://www.itopnews.de/2026/03/intake-kalorien-zaehlen-ohne-abo-und-tracking/"
    );
    expect(
      screen.getByRole("link", { name: /stadt-bremerhaven\.de: intake: schlanke alternative/i })
    ).toHaveAttribute(
      "href",
      "https://stadt-bremerhaven.de/intake-schlanke-alternative-zum-foodtracking-ohne-gamification-und-abonnements/"
    );
  });

  it("renders the localized English press label on /en", () => {
    renderPressMentions("/en");

    expect(screen.getByText("Featured in")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /iphone-ticker: intake: neuer kalorienzähler/i })
    ).toBeInTheDocument();
  });

  it("uses the sourced publication logo assets", () => {
    const { container } = renderPressMentions("/");

    const logoSources = Array.from(container.querySelectorAll("img[aria-hidden='true']")).map(
      (image) => image.getAttribute("src")
    );

    expect(logoSources).toEqual(
      expect.arrayContaining([
        expect.stringContaining("image-icon-256-01-small.png"),
        expect.stringContaining("cropped-cropped-201504_10_iTN-Logo801.png"),
        expect.stringContaining("caschy-logo.svg"),
      ])
    );
  });
});
