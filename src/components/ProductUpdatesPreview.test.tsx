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
    const latestEntryHeading = screen.getByRole("heading", { name: "Was ist neu in Intake 2.2.2" });

    expect(latestEntryHeading).toBeInTheDocument();
    expect(latestEntryHeading.closest("a")).toHaveAttribute("href", "/whats-new/2.2.2");
    expect(screen.getByRole("link", { name: /alle updates ansehen/i })).toHaveAttribute(
      "href",
      "/whats-new"
    );
  });
});
