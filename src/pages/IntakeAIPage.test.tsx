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
    expect(screen.getByText(/jetzt verfügbar/i)).toBeInTheDocument();
    expect(screen.queryByText(/bald verfügbar/i)).not.toBeInTheDocument();
    expect(screen.getByText(/optionales add-on/i)).toBeInTheDocument();
    expect(screen.getByText(/core-app bleibt ein einmalkauf/i)).toBeInTheDocument();
    expect(screen.getByText(/3,99 € pro monat/i)).toBeInTheDocument();
    expect(screen.getByText(/39,99 € pro jahr/i)).toBeInTheDocument();
    expect(screen.getAllByText(/3 tage kostenlos testen/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/eigenen openai-, claude- oder gemini-api-schlüssel/i)).toBeInTheDocument();
    expect(screen.getByText(/grundlegendes kostenloses KI-Logging/i)).toBeInTheDocument();
    expect(screen.getAllByText(/basic-ki-food-logging-chat/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Intake AI vs\. eigener API-Schlüssel \(BYOK\)/i })).toBeInTheDocument();
    expect(screen.queryByText(/Gehostetes Intake AI/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ein einziges Produkt oder eine Mahlzeit/i)).toBeInTheDocument();
    expect(screen.getByText(/zutaten einzeln anzeigen und einzeln loggen/i)).toBeInTheDocument();
    expect(screen.getByText(/größere oder kleinere Portionen wählen/i)).toBeInTheDocument();
    expect(screen.getByText(/kalorien einer schätzung vor dem loggen manuell anpassen/i)).toBeInTheDocument();
    expect(screen.getByText(/korrekturen funktionieren nur per chatnachricht/i)).toBeInTheDocument();
    expect(screen.getByText(/formular zum Erstellen eines Produkts automatisch/i)).toBeInTheDocument();
    expect(screen.getByText(/^nicht verfügbar$/i)).toBeInTheDocument();
    expect(screen.getByText(/mehr kontrolle vor dem loggen/i)).toBeInTheDocument();
    expect(screen.getByText(/nur mit intake ai kannst du erkannte zutaten einzeln prüfen/i)).toBeInTheDocument();
    expect(screen.getByText(/zutaten getrennt prüfen/i)).toBeInTheDocument();
    expect(screen.getByText(/schätzungen direkt korrigieren/i)).toBeInTheDocument();
    expect(screen.getByAltText(/intake ai zeigt erkannte zutaten einzeln/i)).toHaveAttribute(
      "src",
      "/intake-ai/meal-card-components-de.jpg",
    );
    expect(screen.getByAltText(/intake ai korrekturansicht mit zutaten/i)).toHaveAttribute(
      "src",
      "/intake-ai/correction-sheet-de.jpg",
    );
    expect(screen.getAllByText(/kontinuierlich verbessert/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/mit jedem zweiten Update/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ki-ergebnisse sind schätzungen/i)).toBeInTheDocument();
    expect(screen.getByTestId("intake-ai-demo-video")).toHaveAttribute("src", "/intake-ai-demo-de.mp4");
  });

  it("renders the English optional add-on story with text, photo, label, and correction flows", () => {
    renderIntakeAIPage("/en/intake-ai");

    expect(screen.getByRole("heading", { level: 1, name: /^intake ai$/i })).toBeInTheDocument();
    expect(screen.getByText(/available now/i)).toBeInTheDocument();
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(screen.getByText(/optional add-on/i)).toBeInTheDocument();
    expect(screen.getByText(/core app stays a one-time purchase/i)).toBeInTheDocument();
    expect(screen.getByText(/describe a meal in a sentence/i)).toBeInTheDocument();
    expect(screen.getByText(/take a meal photo/i)).toBeInTheDocument();
    expect(screen.getByText(/scan nutrition labels/i)).toBeInTheDocument();
    expect(screen.getByText(/reply naturally to correct the result/i)).toBeInTheDocument();
    expect(screen.getByText(/3\.99 € per month/i)).toBeInTheDocument();
    expect(screen.getByText(/39\.99 € per year/i)).toBeInTheDocument();
    expect(screen.getByText(/own openai, claude, or gemini api key/i)).toBeInTheDocument();
    expect(screen.getAllByText(/basic free AI logging/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/basic AI food logging chat/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Intake AI vs\. own API key \(BYOK\)/i })).toBeInTheDocument();
    expect(screen.queryByText(/Hosted Intake AI/i)).not.toBeInTheDocument();
    expect(screen.getByText(/single product or meal item/i)).toBeInTheDocument();
    expect(screen.getByText(/show ingredients separately and log them separately/i)).toBeInTheDocument();
    expect(screen.getByText(/choose larger or smaller portions/i)).toBeInTheDocument();
    expect(screen.getByText(/manually adjust the calories of an estimate before logging/i)).toBeInTheDocument();
    expect(screen.getByText(/corrections only work by sending a chat message/i)).toBeInTheDocument();
    expect(screen.getByText(/fills out the create-product form/i)).toBeInTheDocument();
    expect(screen.getByText(/^not available$/i)).toBeInTheDocument();
    expect(screen.getByText(/more control before logging/i)).toBeInTheDocument();
    expect(screen.getByText(/only intake ai lets you review recognized ingredients separately/i)).toBeInTheDocument();
    expect(screen.getByText(/Review ingredients separately/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Correct estimates in place$/i })).toBeInTheDocument();
    expect(screen.getByAltText(/intake ai shows recognized ingredients separately/i)).toHaveAttribute(
      "src",
      "/intake-ai/meal-card-components-en.jpg",
    );
    expect(screen.getByAltText(/intake ai correction view with ingredients/i)).toHaveAttribute(
      "src",
      "/intake-ai/correction-sheet-en.jpg",
    );
    expect(screen.getAllByText(/continuously improved/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/every other update/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ai results are estimates/i)).toBeInTheDocument();
    expect(screen.getByTestId("intake-ai-demo-video")).toHaveAttribute("src", "/intake-ai-demo-en.mp4");
  });
});
