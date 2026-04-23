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
    expect(screen.getByRole("link", { name: /macwelt: iphone-kalorienzähler "intake"/i })).toHaveAttribute(
      "href",
      "https://www.macwelt.de/article/3108243/iphone-kalorienzahler-intake-mein-personliches-experiment.html"
    );
    expect(screen.getByText("iPhone-Ticker")).toBeInTheDocument();
    expect(screen.getByText("iTopnews")).toBeInTheDocument();
    expect(
      screen.getByRole(
        "link",
        { name: /iphone-ticker: beliebte kalorien-app intake: nährstofftracking und intervallfasten/i }
      )
    ).toHaveAttribute(
      "href",
      "https://www.iphone-ticker.de/beliebte-kalorien-app-intake-naehrstofftracking-und-intervallfasten-276388"
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
    expect(screen.getByRole("link", { name: /macwelt: iphone-kalorienzähler "intake"/i })).toBeInTheDocument();
    expect(
      screen.getByRole(
        "link",
        { name: /iphone-ticker: beliebte kalorien-app intake: nährstofftracking und intervallfasten/i }
      )
    ).toBeInTheDocument();
  });

  it("shows the Macwelt article first in the press strip", () => {
    renderPressMentions("/");

    const pressLinks = screen.getAllByRole("link");

    expect(pressLinks[0]).toHaveAttribute(
      "href",
      "https://www.macwelt.de/article/3108243/iphone-kalorienzahler-intake-mein-personliches-experiment.html"
    );
  });

  it("uses the sourced publication logo assets", () => {
    const { container } = renderPressMentions("/");

    const logoSources = Array.from(container.querySelectorAll("img[aria-hidden='true']")).map(
      (image) => image.getAttribute("src")
    );

    expect(logoSources).toEqual(
      expect.arrayContaining([
        expect.stringContaining("macwelt-logo.svg"),
        expect.stringContaining("image-icon-256-01-small.png"),
        expect.stringContaining("cropped-cropped-201504_10_iTN-Logo801.png"),
        expect.stringContaining("caschy-logo.svg"),
      ])
    );
  });
});
