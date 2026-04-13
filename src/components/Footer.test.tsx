import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";

describe("Footer", () => {
  it("renders localized seo page links alongside the update links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Funktionen" })).toHaveAttribute(
      "href",
      "/funktionen"
    );
    expect(screen.getByRole("link", { name: "Kalorienzähler ohne Abo" })).toHaveAttribute(
      "href",
      "/kalorienzaehler-ohne-abo"
    );
    expect(screen.getByRole("link", { name: "Vergleiche" })).toHaveAttribute(
      "href",
      "/vergleiche"
    );
    expect(screen.getByRole("link", { name: "Was ist neu" })).toHaveAttribute(
      "href",
      "/whats-new"
    );
    expect(screen.getByRole("link", { name: "Feature Voting" })).toHaveAttribute(
      "href",
      "https://featurevoting.tobibechtold.dev/app/intake"
    );

    expect(screen.getByRole("link", { name: "Changelog" })).toHaveAttribute(
      "href",
      "https://featurevoting.tobibechtold.dev/app/intake/changelog"
    );
  });
});
