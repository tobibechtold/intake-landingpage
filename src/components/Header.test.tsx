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

    expect(screen.getAllByRole("link", { name: /funktionen|features/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /vergleiche|comparisons/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /hilfe|help/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /updates/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "Feature Voting" })).not.toBeInTheDocument();
  });

  it("keeps the desktop nav focused on the main destination pages", () => {
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
    expect(desktopFeaturesLink.className).toContain("px-2");
    expect(document.querySelector("[data-header-desktop-nav]")?.className).toContain("gap-4");
    expect(screen.getAllByRole("link", { name: /vergleiche|comparisons/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /hilfe|help/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /updates/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /warum wechseln|why switch/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /häufige fragen|frequently asked questions/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Feature Voting" })).not.toBeInTheDocument();
  });

  it("groups the logo and nav on the left side of the header", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </MemoryRouter>
    );

    const headerShell = document.querySelector("[data-site-header-shell]");
    const leftCluster = document.querySelector("[data-header-left-cluster]");
    const rightCluster = document.querySelector("[data-header-right-cluster]");
    const brandLink = screen.getByRole("link", { name: /intake intake/i });
    const desktopNav = document.querySelector("[data-header-desktop-nav]");

    expect(headerShell).toBeInTheDocument();
    expect(leftCluster).toBeInTheDocument();
    expect(rightCluster).toBeInTheDocument();
    expect(desktopNav).toBeInTheDocument();
    expect(leftCluster).toContainElement(brandLink);
    expect(leftCluster).toContainElement(desktopNav);
    expect(headerShell).toContainElement(leftCluster);
    expect(headerShell).toContainElement(rightCluster);
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
