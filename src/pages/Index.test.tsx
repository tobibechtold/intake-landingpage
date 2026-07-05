import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./Index";

describe("Index", () => {
  it("places a mobile-only Intake AI banner directly after the hero", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <LanguageProvider>
          <Index />
        </LanguageProvider>
      </MemoryRouter>
    );

    const banner = screen.getByTestId("mobile-intake-ai-banner");
    expect(banner).toHaveClass("md:hidden");
    expect(banner).toHaveTextContent(/new: intake ai/i);
    expect(banner).toHaveTextContent(/editable ingredients/i);
    expect(within(banner).getByRole("link", { name: /see intake ai/i })).toHaveAttribute(
      "href",
      "/en/intake-ai",
    );

    const main = screen.getByRole("main");
    const hero = document.querySelector("#hero");
    const press = screen.getByText("Featured in").closest("section");
    expect(hero).not.toBeNull();
    expect(press).not.toBeNull();
    expect(Array.from(main.children).indexOf(banner)).toBe(Array.from(main.children).indexOf(hero!) + 1);
    expect(Array.from(main.children).indexOf(banner)).toBeLessThan(Array.from(main.children).indexOf(press!));
  });

  it("renders the revised German conversion copy on the default homepage", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Index />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /kalorien tracken, ohne abo\./i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/mit intake trackst du kalorien, makros und 30\+ nährwerte/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/30\+ Nährwerte|Vitamine|Mineralstoffe/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Intervallfasten|Wasser-Tracking/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /warum viele zu intake wechseln/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /warum intake im alltag besser funktioniert/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /neu: intake ai/i })).toBeInTheDocument();
    expect(screen.getByText(/jetzt verfügbar/i)).toBeInTheDocument();
    expect(screen.queryByText(/bald verfügbar/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/basic-ki-logging mit eigenem api-schlüssel \(byok\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /intake ai ansehen/i })[0]).toHaveAttribute("href", "/intake-ai");
    expect(screen.getByRole("heading", { name: /die wichtigsten seiten auf einen blick/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /produktupdates/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /roadmap & abstimmung/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /häufige fragen/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /intake vs\. klassische abo-tracker/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /wechsle zu einem kalorientracker ohne abo\./i })
    ).toBeInTheDocument();
    expect(screen.getByText("Bekannt aus")).toBeInTheDocument();
  });

  it("renders the English conversion-focused home page structure on /en", () => {
    render(
      <MemoryRouter initialEntries={["/en"]}>
        <LanguageProvider>
          <Index />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole("link", { name: /download on the app store/i }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /why people switch/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /the most useful pages in one place/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /new: intake ai/i })).toBeInTheDocument();
    expect(screen.getByText(/available now/i)).toBeInTheDocument();
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/basic AI logging with your own API key \(BYOK\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /see intake ai/i })[0]).toHaveAttribute("href", "/en/intake-ai");
    expect(
      screen.getByRole("heading", { name: /product updates/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view roadmap & vote/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /intake vs typical subscription trackers/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /frequently asked questions/i })
    ).not.toBeInTheDocument();
    expect(screen.getByText("Featured in")).toBeInTheDocument();
  });
});
