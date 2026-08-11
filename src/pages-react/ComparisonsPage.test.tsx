import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ComparisonsIndexPage from "./ComparisonsIndexPage";
import ComparisonDetailPage from "./ComparisonDetailPage";

describe("Comparison pages", () => {
  it("renders the german comparison hub with links to competitor pages", () => {
    render(
        <LanguageProvider lang="de" alternateHref="/">
          <ComparisonsIndexPage lang="de" alternateHref="/" />
        </LanguageProvider>
    );

    expect(
      screen.getByRole("heading", { name: /Wie sich Intake von Yazio, FDDB/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Abo oder nicht|Konto nötig oder nicht|Was direkt in der App steckt/i).length
    ).toBeGreaterThan(0);
    expect(
      screen
        .getAllByRole("link", { name: /Yazio Alternative/i })
        .some((link) => link.getAttribute("href") === "/vergleiche/yazio-alternative")
    ).toBe(true);
    expect(
      screen
        .getAllByRole("link", { name: /FDDB Alternative/i })
        .some((link) => link.getAttribute("href") === "/vergleiche/fddb-alternative")
    ).toBe(true);
  });

  it("renders the german comparison detail page with more natural copy", () => {
    render(
        <LanguageProvider lang="de" alternateHref="/">
          <ComparisonDetailPage lang="de" alternateHref="/" />
        </LanguageProvider>
    );

    expect(screen.getByRole("heading", { name: /Yazio Alternative/i })).toBeInTheDocument();
    expect(
      screen.getAllByText(/Abo oder nicht|Was du ohne Abo bekommst|Für wen passt was/i).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/kein Konto|Streaks|Tipps/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Alle Vergleiche/i })).toHaveAttribute(
      "href",
      "/vergleiche"
    );
    expect(screen.getByRole("link", { name: /Alle Vergleiche/i }).className).toContain(
      "trust-chip-link"
    );
  });

  it("renders the english comparison detail page with factual criteria", () => {
    render(
        <LanguageProvider lang="en" alternateHref="/">
          <ComparisonDetailPage lang="de" alternateHref="/" />
        </LanguageProvider>
    );

    expect(screen.getByRole("heading", { name: /Yazio Alternative/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Business model|Product style|What is included/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/streaks|gamification|coaching/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /All comparisons/i })).toHaveAttribute(
      "href",
      "/en/comparisons"
    );
  });
});
