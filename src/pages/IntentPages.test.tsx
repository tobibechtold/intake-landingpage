import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import NoSubscriptionPage from "./NoSubscriptionPage";
import NoAccountPage from "./NoAccountPage";

const renderRoute = (initialEntry: string, element: React.ReactElement) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <Routes>
          <Route path="/kalorienzaehler-ohne-abo" element={<NoSubscriptionPage />} />
          <Route path="/kalorien-tracker-ohne-konto" element={<NoAccountPage />} />
          <Route path="/en/calorie-counter-no-subscription" element={<NoSubscriptionPage />} />
          <Route path="/en/calorie-tracker-no-account" element={element} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  );

describe("Intent pages", () => {
  it("renders the german no-subscription page with full-feature messaging", () => {
    renderRoute("/kalorienzaehler-ohne-abo", <NoSubscriptionPage />);

    expect(
      screen.getByRole("heading", { name: /Kalorienzähler ohne Abo und ohne Premium-Wall/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/30\+ Nährwerte|PDF-Export|Apple Watch/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Keine Streaks|Keine Punkte|Intervallfasten/i).length).toBeGreaterThan(0);
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
  });
});
