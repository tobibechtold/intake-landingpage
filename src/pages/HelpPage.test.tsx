import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import HelpPage from "./HelpPage";

describe("HelpPage", () => {
  it("renders the German help hub with faq content and a download next step", () => {
    render(
      <MemoryRouter initialEntries={["/hilfe"]}>
        <LanguageProvider>
          <HelpPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /hilfe & faq/i })).toBeInTheDocument();
    expect(
      screen.getByText(/antworten zu preis, datenschutz, sync und den wichtigsten funktionen/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/ist intake ein abo-modell\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/wenn du noch unsicher bist, schau dir unsere funktionen und vergleiche mit anderen tracking-apps an oder geh direkt zum download\./i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /intake herunterladen/i })).toHaveAttribute("href", "/#hero");
  });

  it("renders the English help hub with faq content and a download next step", () => {
    render(
      <MemoryRouter initialEntries={["/en/help"]}>
        <LanguageProvider>
          <HelpPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /help & faq/i })).toBeInTheDocument();
    expect(
      screen.getByText(/answers about pricing, privacy, sync, and the most important features/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/is intake a subscription-based app\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/if you're still unsure, check out our features and comparisons with other tracking apps, or go straight to the download section\./i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download intake/i })).toHaveAttribute("href", "/en#hero");
  });
});
