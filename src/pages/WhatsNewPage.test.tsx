import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import WhatsNewEntry from "./WhatsNewEntry";
import WhatsNewIndex from "./WhatsNewIndex";

const renderWithRoute = (initialEntry: string, element: React.ReactElement) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <Routes>
          <Route path="/whats-new" element={<WhatsNewIndex />} />
          <Route path="/whats-new/:version" element={<WhatsNewEntry />} />
          <Route path="/de/whats-new" element={<WhatsNewIndex />} />
          <Route path="/de/whats-new/:version" element={element} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  );

describe("What's New pages", () => {
  it("renders the German overview page with the latest release card", () => {
    renderWithRoute("/de/whats-new", <WhatsNewIndex />);

    expect(
      screen.getByRole("heading", { name: "Was ist neu in Intake 2.1.3" })
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: /mehr erfahren/i })
        .some((link) => link.getAttribute("href") === "/de/whats-new/2.1.3")
    ).toBe(true);
    expect(screen.getByRole("link", { name: "Changelog öffnen" })).toHaveAttribute(
      "href",
      "https://featurevoting.tobibechtold.dev/app/intake/changelog"
    );
  });

  it("renders the English detail page with a link back to the overview", () => {
    renderWithRoute("/whats-new/2.1.1", <WhatsNewEntry />);

    expect(
      screen.getByRole("heading", { name: "What's new in Intake 2.1.1" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to overview/i })).toHaveAttribute(
      "href",
      "/whats-new"
    );
  });

  it("renders the German detail page with the umlaut in the overview link", () => {
    renderWithRoute("/de/whats-new/2.1.1", <WhatsNewEntry />);

    expect(screen.getByRole("link", { name: "Zur Übersicht" })).toHaveAttribute(
      "href",
      "/de/whats-new"
    );
  });

  it("renders inline release videos with autoplay behavior and desktop constraints", () => {
    const view = renderWithRoute("/de/whats-new/2.1.1", <WhatsNewEntry />);

    const video = screen.getByLabelText("Mahlzeit teilen");
    const prose = view.container.querySelector(".prose");

    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("muted");
    expect(video).toHaveAttribute("playsinline");
    expect(prose?.className).toContain("md:[&_video]:max-w-[34rem]");
  });
});
