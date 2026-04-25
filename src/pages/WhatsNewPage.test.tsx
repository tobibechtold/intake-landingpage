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
          <Route path="/en/whats-new" element={<WhatsNewIndex />} />
          <Route path="/en/whats-new/:version" element={element} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  );

describe("What's New pages", () => {
  it("renders the German overview page with the latest release card", () => {
    const view = renderWithRoute("/whats-new", <WhatsNewIndex />);

    const latestEntryHeading = screen.getByRole("heading", { name: "Was ist neu in Intake 2.3.0" });
    const overviewGrid = view.container.querySelector(".grid");

    expect(latestEntryHeading).toBeInTheDocument();
    expect(latestEntryHeading.closest("a")).toHaveAttribute("href", "/whats-new/2.3.0");
    expect(overviewGrid?.className).toContain("md:grid-cols-2");
    expect(overviewGrid?.className).toContain("xl:grid-cols-3");
    expect(screen.getByRole("link", { name: "Changelog öffnen" })).toHaveAttribute(
      "href",
      "https://featurevoting.tobibechtold.dev/app/intake/changelog"
    );
  });

  it("renders the English detail page with a link back to the overview", () => {
    renderWithRoute("/en/whats-new/2.1.1", <WhatsNewEntry />);

    expect(
      screen.getByRole("heading", { name: "What's new in Intake 2.1.1" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to overview/i })).toHaveAttribute(
      "href",
      "/en/whats-new"
    );
  });

  it("renders the German detail page with the umlaut in the overview link", () => {
    renderWithRoute("/whats-new/2.1.1", <WhatsNewEntry />);

    expect(screen.getByRole("link", { name: "Zur Übersicht" })).toHaveAttribute(
      "href",
      "/whats-new"
    );
  });

  it("renders inline release videos with autoplay behavior and desktop constraints", () => {
    const view = renderWithRoute("/whats-new/2.1.1", <WhatsNewEntry />);

    const video = screen.getByLabelText("Mahlzeit teilen");
    const prose = view.container.querySelector(".prose");

    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("muted");
    expect(video).toHaveAttribute("playsinline");
    expect(prose?.className).toContain("md:[&_video]:max-w-[34rem]");
  });
});
