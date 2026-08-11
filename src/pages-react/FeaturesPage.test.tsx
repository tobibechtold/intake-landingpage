import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import FeaturesPage from "./FeaturesPage";

describe("FeaturesPage", () => {
  it("renders the german feature overview with nutrient and fasting content", () => {
    render(
        <LanguageProvider lang="de" alternateHref="/">
          <FeaturesPage lang="de" alternateHref="/" />
        </LanguageProvider>
    );

    expect(
      screen.getByRole("heading", { name: /Die Intake Funktionen, die im Alltag wirklich wichtig sind/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Vitamine, Mineralstoffe, Koffein|PDF-Export/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Intervallfasten|Apple Watch|Widgets/i).length).toBeGreaterThan(0);
    expect(
      screen
        .getAllByRole("link", { name: /Kalorienzähler ohne Abo/i })
        .some((link) => link.getAttribute("href") === "/kalorienzaehler-ohne-abo")
    ).toBe(true);
  });
});
