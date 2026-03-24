import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./Index";

describe("Index", () => {
  it("renders the revised conversion-focused home page structure", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
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
