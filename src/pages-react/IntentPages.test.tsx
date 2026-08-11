import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import NoSubscriptionPage from "./NoSubscriptionPage";
import NoAccountPage from "./NoAccountPage";

const renderRoute = (initialEntry: string, element: React.ReactElement) =>
  render(
      <LanguageProvider lang="de" alternateHref="/">
        <NoSubscriptionPage lang="de" alternateHref="/" />
      </LanguageProvider>
  );

describe("Intent pages", () => {
  it("renders the german no-subscription page with full-feature messaging", () => {
    const view = renderRoute("/kalorienzaehler-ohne-abo", <NoSubscriptionPage />);

    expect(
      screen.getByRole("heading", { name: /Kalorienzähler ohne Abo und ohne Premium-Wall/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/30\+ Nährwerte|PDF-Export|Apple Watch/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Keine Streaks|Keine Punkte|Intervallfasten/i).length).toBeGreaterThan(0);

    const textOnlySectionHeading = screen.getByRole("heading", {
      name: /Keine Gamification, keine nervigen Ernährungstipps/i,
    });
    const textOnlyArticle = textOnlySectionHeading.closest("article");
    const textOnlyCopy = view.container.querySelector(".proof-story-copy--full");

    expect(textOnlyArticle?.className).toContain("proof-story-card--text-only");
    expect(textOnlyCopy).toContainElement(textOnlySectionHeading);
  });

  it("renders the english no-account page with privacy-focused copy", () => {
    renderRoute("/en/calorie-tracker-no-account", <NoAccountPage />);

    expect(
      screen.getByRole("heading", { name: /No account\. No signup\./i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/no account system at all|optional iCloud|Google Drive sync/i).length
    ).toBeGreaterThan(0);
    expect(
      screen
        .getAllByRole("link", { name: /features/i })
        .some((link) => link.getAttribute("href") === "/en/features")
    ).toBe(true);
    const relatedFeaturesLink = screen
      .getAllByRole("link", { name: /^features$/i })
      .find((link) => link.getAttribute("class")?.includes("trust-chip"));

    expect(relatedFeaturesLink?.className).toContain("trust-chip-link");
  });
});
