import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Privacy from "./Privacy";
import Terms from "./Terms";

function renderLegalPage(path: string, element: React.ReactElement) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        {element}
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("legal pages", () => {
  it("discloses hosted Intake AI processing and providers in the English privacy policy", () => {
    renderLegalPage("/en/privacy", <Privacy />);

    expect(screen.getByText(/Last updated: June 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Intake AI/i })).toBeInTheDocument();
    expect(screen.getByText(/food descriptions, photos, captions, and recent chat context/i)).toBeInTheDocument();
    expect(screen.getByText(/Supabase backend/i)).toBeInTheDocument();
    expect(screen.getByText(/OpenAI and\/or Google Gemini/i)).toBeInTheDocument();
    expect(screen.getByText(/does not store raw prompts or photos in the usage ledger/i)).toBeInTheDocument();
    expect(screen.getByText(/subscription entitlement/i)).toBeInTheDocument();
  });

  it("discloses hosted Intake AI processing and providers in the German privacy policy", () => {
    renderLegalPage("/privacy", <Privacy />);

    expect(screen.getByText(/Stand: Juni 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Intake AI/i })).toBeInTheDocument();
    expect(screen.getByText(/Essensbeschreibungen, Fotos, Bildunterschriften und den letzten Chat-Kontext/i)).toBeInTheDocument();
    expect(screen.getByText(/Supabase-Backend/i)).toBeInTheDocument();
    expect(screen.getByText(/OpenAI und\/oder Google Gemini/i)).toBeInTheDocument();
    expect(screen.getByText(/keine Roh-Prompts oder Fotos im Nutzungsprotokoll/i)).toBeInTheDocument();
    expect(screen.getByText(/Abo-Berechtigung/i)).toBeInTheDocument();
  });

  it("states Intake AI estimate, upload, provider, and BYOK responsibilities in the English terms", () => {
    renderLegalPage("/en/terms", <Terms />);

    expect(screen.getByText(/Last updated: June 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Intake AI/i })).toBeInTheDocument();
    expect(screen.getByText(/optional, subscription-based feature/i)).toBeInTheDocument();
    expect(screen.getByText(/review AI suggestions before logging them/i)).toBeInTheDocument();
    expect(screen.getByText(/Avoid uploading photos that include unrelated people, documents, or sensitive personal information/i)).toBeInTheDocument();
    expect(screen.getByText(/user-selected provider/i)).toBeInTheDocument();
  });

  it("states Intake AI estimate, upload, provider, and BYOK responsibilities in the German terms", () => {
    renderLegalPage("/terms", <Terms />);

    expect(screen.getByText(/Stand: Juni 2026/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Intake AI/i })).toBeInTheDocument();
    expect(screen.getByText(/optionale, abo-basierte Funktion/i)).toBeInTheDocument();
    expect(screen.getByText(/KI-Vorschläge vor dem Speichern prüfen/i)).toBeInTheDocument();
    expect(screen.getByText(/Lade möglichst keine Fotos hoch, auf denen unbeteiligte Personen, Dokumente oder sensible persönliche Informationen zu sehen sind/i)).toBeInTheDocument();
    expect(screen.getByText(/selbst ausgewählten Anbieter/i)).toBeInTheDocument();
  });
});
