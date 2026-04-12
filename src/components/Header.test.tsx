import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "./Header";

describe("Header", () => {
  it("renders a mobile navigation trigger and opens the sheet with nav links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /navigation öffnen|open navigation/i }));

    expect(screen.getAllByRole("link", { name: /häufige fragen|frequently asked questions/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /funktionen|features/i }).length).toBeGreaterThan(0);
  });
});
