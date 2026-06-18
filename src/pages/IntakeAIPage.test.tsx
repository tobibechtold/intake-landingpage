import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import IntakeAIPage from "./IntakeAIPage";

function renderIntakeAIPage(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Routes>
          <Route path="/intake-ai" element={<IntakeAIPage />} />
          <Route path="/en/intake-ai" element={<IntakeAIPage />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("IntakeAIPage", () => {
  it("renders the German optional add-on story with pricing, BYOK, and demo video", () => {
    renderIntakeAIPage("/intake-ai");

    expect(screen.getByRole("heading", { level: 1, name: /^intake ai$/i })).toBeInTheDocument();
    expect(screen.getByText(/bald verfügbar/i)).toBeInTheDocument();
    expect(screen.getByText(/optionales add-on/i)).toBeInTheDocument();
    expect(screen.getByText(/core-app bleibt ein einmalkauf/i)).toBeInTheDocument();
    expect(screen.getByText(/3,99 € pro monat/i)).toBeInTheDocument();
    expect(screen.getByText(/39,99 € pro jahr/i)).toBeInTheDocument();
    expect(screen.getAllByText(/3 tage kostenlos testen/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/eigenen openai- oder claude-api-schlüssel/i)).toBeInTheDocument();
    expect(screen.getByText(/ki-ergebnisse sind schätzungen/i)).toBeInTheDocument();
    expect(screen.getByTestId("intake-ai-demo-video")).toHaveAttribute("src", "/intake-ai-demo-de.mp4");
  });

  it("renders the English optional add-on story with text, photo, label, and correction flows", () => {
    renderIntakeAIPage("/en/intake-ai");

    expect(screen.getByRole("heading", { level: 1, name: /^intake ai$/i })).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByText(/optional add-on/i)).toBeInTheDocument();
    expect(screen.getByText(/core app stays a one-time purchase/i)).toBeInTheDocument();
    expect(screen.getByText(/describe a meal in a sentence/i)).toBeInTheDocument();
    expect(screen.getByText(/take a meal photo/i)).toBeInTheDocument();
    expect(screen.getByText(/scan nutrition labels/i)).toBeInTheDocument();
    expect(screen.getByText(/reply naturally to correct the result/i)).toBeInTheDocument();
    expect(screen.getByText(/3\.99 € per month/i)).toBeInTheDocument();
    expect(screen.getByText(/39\.99 € per year/i)).toBeInTheDocument();
    expect(screen.getByText(/own openai or claude api key/i)).toBeInTheDocument();
    expect(screen.getByText(/ai results are estimates/i)).toBeInTheDocument();
    expect(screen.getByTestId("intake-ai-demo-video")).toHaveAttribute("src", "/intake-ai-demo-en.mp4");
  });
});
