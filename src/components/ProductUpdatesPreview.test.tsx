import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ProductUpdatesPreview from "./ProductUpdatesPreview";

describe("ProductUpdatesPreview", () => {
  it("renders the recent product updates preview with archive and entry links", () => {
    render(
        <LanguageProvider lang="de" alternateHref="/">
          <ProductUpdatesPreview />
        </LanguageProvider>
    );

    expect(screen.getByRole("heading", { name: "Produktupdates" })).toBeInTheDocument();
    const latestEntryHeading = screen.getByRole("heading", { name: "Was ist neu in Intake 2.5.1" });

    expect(latestEntryHeading).toBeInTheDocument();
    expect(latestEntryHeading.closest("a")).toHaveAttribute("href", "/whats-new/2.5.1");
    expect(screen.getByRole("link", { name: /alle updates ansehen/i })).toHaveAttribute(
      "href",
      "/whats-new"
    );
  });
});
