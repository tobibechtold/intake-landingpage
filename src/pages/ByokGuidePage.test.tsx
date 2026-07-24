import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ByokGuidePage from "./ByokGuidePage";

function renderGuide(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Routes>
          <Route path="/hilfe/eigener-api-schluessel" element={<ByokGuidePage />} />
          <Route path="/en/help/own-api-key" element={<ByokGuidePage />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("ByokGuidePage", () => {
  it("explains BYOK and its security model to German beginners", () => {
    renderGuide("/hilfe/eigener-api-schluessel");

    expect(
      screen.getByRole("heading", { level: 1, name: /eigenen api-schlüssel.*einrichten/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/wie ein privates passwort/i)).toBeInTheDocument();
    expect(screen.getByText(/kleine textbausteine/i)).toBeInTheDocument();
    expect(screen.getByText(/sicher nur auf deinem gerät gespeichert/i)).toBeInTheDocument();
    expect(screen.getByText(/verlässt dein gerät nicht/i)).toBeInTheDocument();
    expect(screen.getByText(/passendes standardmodell/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/kostenlose stufe für bestimmte modelle und regionen/i).length
    ).toBeGreaterThan(0);
    const screenshots = screen.getAllByTestId("byok-guide-screenshot");
    expect(screenshots).toHaveLength(3);
    expect(screenshots[0]).toHaveAttribute("src", "/intake-ai/byok/intake-settings-de.png");
    expect(screenshots[0]).toHaveAttribute(
      "alt",
      expect.stringMatching(/zahnrad.*einstellungen/i)
    );
    expect(screenshots[1]).toHaveAttribute(
      "src",
      "/intake-ai/byok/intake-ai-navigation-de.png"
    );
    expect(screenshots[1]).toHaveAttribute(
      "alt",
      expect.stringMatching(/intake ai.*einstellungen/i)
    );
    expect(screenshots[2]).toHaveAttribute("src", "/intake-ai/byok/byok-form-de.png");
    expect(screenshots[2]).toHaveAttribute(
      "alt",
      expect.stringMatching(/anbieter.*modell.*api-schlüssel/i)
    );

    expect(screen.getByRole("link", { name: /api-schlüssel bei openai erstellen/i })).toHaveAttribute(
      "href",
      "https://platform.openai.com/api-keys"
    );
    expect(screen.getByRole("link", { name: /api-schlüssel bei claude erstellen/i })).toHaveAttribute(
      "href",
      "https://platform.claude.com/settings/keys"
    );
    expect(screen.getByRole("link", { name: /api-schlüssel bei gemini erstellen/i })).toHaveAttribute(
      "href",
      "https://aistudio.google.com/apikey"
    );
    expect(screen.getByRole("link", { name: /zurück zu hilfe & faq/i })).toHaveAttribute(
      "href",
      "/hilfe"
    );
    expect(screen.getByRole("link", { name: /mehr über intake ai/i })).toHaveAttribute(
      "href",
      "/intake-ai"
    );
  });

  it("renders the equivalent English setup guide", () => {
    renderGuide("/en/help/own-api-key");

    expect(
      screen.getByRole("heading", { level: 1, name: /set up your own api key/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/like a private password/i)).toBeInTheDocument();
    expect(screen.getByText(/small pieces of text/i)).toBeInTheDocument();
    expect(screen.getByText(/stored securely only on your device/i)).toBeInTheDocument();
    expect(screen.getByText(/never leaves your device/i)).toBeInTheDocument();
    expect(screen.getByText(/suitable default model/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/free tier for certain models and regions/i).length
    ).toBeGreaterThan(0);
    const screenshots = screen.getAllByTestId("byok-guide-screenshot");
    expect(screenshots).toHaveLength(3);
    expect(screenshots[0]).toHaveAttribute("src", "/intake-ai/byok/intake-settings-en.png");
    expect(screenshots[0]).toHaveAttribute(
      "alt",
      expect.stringMatching(/gear.*settings/i)
    );
    expect(screenshots[1]).toHaveAttribute(
      "src",
      "/intake-ai/byok/intake-ai-navigation-en.png"
    );
    expect(screenshots[1]).toHaveAttribute(
      "alt",
      expect.stringMatching(/intake ai.*settings/i)
    );
    expect(screenshots[2]).toHaveAttribute("src", "/intake-ai/byok/byok-form-en.png");
    expect(screenshots[2]).toHaveAttribute(
      "alt",
      expect.stringMatching(/provider.*model.*api key/i)
    );

    expect(screen.getByRole("link", { name: /create an api key with openai/i })).toHaveAttribute(
      "href",
      "https://platform.openai.com/api-keys"
    );
    expect(screen.getByRole("link", { name: /create an api key with claude/i })).toHaveAttribute(
      "href",
      "https://platform.claude.com/settings/keys"
    );
    expect(screen.getByRole("link", { name: /create an api key with gemini/i })).toHaveAttribute(
      "href",
      "https://aistudio.google.com/apikey"
    );
    expect(screen.getByRole("link", { name: /back to help & faq/i })).toHaveAttribute(
      "href",
      "/en/help"
    );
    expect(screen.getByRole("link", { name: /learn more about intake ai/i })).toHaveAttribute(
      "href",
      "/en/intake-ai"
    );
  });
});
