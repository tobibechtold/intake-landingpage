import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("button", { name: /^preis$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^intake ai$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /eigener api-schlüssel \(byok\)/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /anleitung zur byok-einrichtung öffnen/i })
    ).toHaveAttribute("href", "/hilfe/eigener-api-schluessel");

    fireEvent.click(screen.getByRole("button", { name: /^intake ai$/i }));
    fireEvent.click(screen.getByRole("button", { name: /was ist der unterschied zwischen intake ai/i }));
    expect(screen.getByText(/umfangreicheren food-logging-ablauf/i)).toBeInTheDocument();

    const search = screen.getByLabelText(/faq durchsuchen/i);
    fireEvent.change(search, { target: { value: "Gemini" } });
    expect(screen.getByRole("button", { name: /welche anbieter kann ich mit eigenem api-schlüssel/i })).toBeInTheDocument();
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
    expect(screen.getByRole("button", { name: /^pricing$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^intake ai$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /own api key \(byok\)/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open the byok setup guide/i })
    ).toHaveAttribute("href", "/en/help/own-api-key");

    fireEvent.click(screen.getByRole("button", { name: /^intake ai$/i }));
    fireEvent.click(screen.getByRole("button", { name: /what is the difference between intake ai/i }));
    expect(screen.getByText(/richer food-logging workflow/i)).toBeInTheDocument();

    const search = screen.getByLabelText(/search faq/i);
    fireEvent.change(search, { target: { value: "Gemini" } });
    expect(screen.getByRole("button", { name: /which providers can i use with my own api key/i })).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "nothing matches this" } });
    expect(screen.getByText(/no matching questions/i)).toBeInTheDocument();
    expect(
      screen.getByText(/if you're still unsure, check out our features and comparisons with other tracking apps, or go straight to the download section\./i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download intake/i })).toHaveAttribute("href", "/en#hero");
  });
});
