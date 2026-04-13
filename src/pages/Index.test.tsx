import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./Index";

describe("Index", () => {
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
