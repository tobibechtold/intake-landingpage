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
    expect(
      screen
        .getAllByRole("link", { name: "Feature Voting" })
        .some((link) => link.getAttribute("href") === "https://featurevoting.tobibechtold.dev/app/intake")
    ).toBe(true);
  });

  it("uses plain desktop nav links with accent hover instead of pill styling", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>
    );

    const desktopFeaturesLink = screen.getAllByRole("link", { name: /funktionen|features/i })[0];

    expect(desktopFeaturesLink.className).toContain("text-foreground");
    expect(desktopFeaturesLink.className).toContain("hover:text-primary");
    expect(desktopFeaturesLink.className).not.toContain("rounded-full");
    expect(desktopFeaturesLink.className).not.toContain("border");
  });

  it("falls back to the hero anchor for the download button when the platform is unknown", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>
    );

    const downloadLinks = screen.getAllByRole("link", { name: /herunterladen|download/i });

    expect(downloadLinks[0]).toHaveAttribute("href", "/#hero");
  });
});
