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

    expect(screen.getByRole("heading", { name: "Product Updates" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What's new in Intake 2.1.3" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all updates/i })).toHaveAttribute(
      "href",
      "/whats-new"
    );
    expect(
      screen
        .getAllByRole("link", { name: /read update/i })
        .some((link) => link.getAttribute("href") === "/whats-new/2.1.3")
    ).toBe(true);
  });
});
