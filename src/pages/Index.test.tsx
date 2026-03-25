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
      screen.getByText(/kalorienzähler ohne abo, ohne konto/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /warum viele zu intake wechseln/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /intake vs\. klassische abo-tracker/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /warum intake im alltag besser funktioniert/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /roadmap & abstimmung/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /wechsle zu einem kalorientracker ohne abo\./i })
    ).toBeInTheDocument();
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
      screen.getByRole("heading", { name: /intake vs typical subscription trackers/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /product updates/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /frequently asked questions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view roadmap & vote/i })
    ).toBeInTheDocument();
  });
});
