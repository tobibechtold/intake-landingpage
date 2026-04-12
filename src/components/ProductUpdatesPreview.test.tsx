import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ProductUpdatesPreview from "./ProductUpdatesPreview";

describe("ProductUpdatesPreview", () => {
  it("renders the recent product updates preview with archive and entry links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <ProductUpdatesPreview />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Produktupdates" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Was ist neu in Intake 2.2.2" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /alle updates ansehen/i })).toHaveAttribute(
      "href",
      "/whats-new"
    );
    expect(
      screen
        .getAllByRole("link", { name: /update lesen/i })
        .some((link) => link.getAttribute("href") === "/whats-new/2.2.2")
    ).toBe(true);
  });
});
