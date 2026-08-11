import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import type { ReleaseSummary } from "@/lib/releases";
import WhatsNewEntry from "./WhatsNewEntry";
import WhatsNewIndex from "./WhatsNewIndex";

/**
 * These pages used to read markdown themselves through import.meta.glob. The Astro
 * route now owns the content collection and passes plain ReleaseSummary objects down,
 * so the tests supply that data directly instead of depending on the filesystem.
 */
const releases: ReleaseSummary[] = [
  {
    version: "2.4.6",
    publishedAt: "2026-06-01",
    title: "Was ist neu in Intake 2.4.6",
    summary: "Aktivitäts-Sheet, KI-Favoriten und Sortierung.",
    coverImage: "/_astro/cover.svg",
    highlights: ["Aktivitäts-Sheet", "KI-Favoriten"],
    href: "/whats-new/2.4.6",
  },
  {
    version: "2.4.5",
    publishedAt: "2026-05-01",
    title: "Was ist neu in Intake 2.4.5",
    summary: "Kalorienquelle und Wasser.",
    coverImage: "/_astro/cover.svg",
    highlights: ["Kalorienquelle"],
    href: "/whats-new/2.4.5",
  },
];

const entry: ReleaseSummary = {
  version: "2.1.1",
  publishedAt: "2026-02-01",
  title: "What's new in Intake 2.1.1",
  summary: "Sharing recipes and macro distribution.",
  coverImage: "/_astro/cover.svg",
  highlights: ["Share recipes"],
  href: "/en/whats-new/2.1.1",
};

describe("What's New pages", () => {
  it("renders the German overview page with the latest release card", () => {
    const view = render(
      <LanguageProvider lang="de" alternateHref="/en/whats-new">
        <WhatsNewIndex lang="de" alternateHref="/en/whats-new" releases={releases} />
      </LanguageProvider>,
    );

    const heading = screen.getByRole("heading", { name: "Was ist neu in Intake 2.4.6" });
    expect(heading).toBeInTheDocument();
    expect(heading.closest("a")).toHaveAttribute("href", "/whats-new/2.4.6");

    const grid = view.container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("xl:grid-cols-3");

    expect(screen.getByRole("link", { name: "Changelog öffnen" })).toHaveAttribute(
      "href",
      "https://featurevoting.tobibechtold.dev/app/intake/changelog",
    );
  });

  it("renders the English detail page with a link back to the overview", () => {
    render(
      <LanguageProvider lang="en" alternateHref="/whats-new/2.1.1">
        <WhatsNewEntry lang="en" alternateHref="/whats-new/2.1.1" entry={entry} />
      </LanguageProvider>,
    );

    expect(screen.getByRole("heading", { name: "What's new in Intake 2.1.1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to overview/i })).toHaveAttribute(
      "href",
      "/en/whats-new",
    );
  });

  it("renders the German detail page with the umlaut in the overview link", () => {
    render(
      <LanguageProvider lang="de" alternateHref="/en/whats-new/2.1.1">
        <WhatsNewEntry
          lang="de"
          alternateHref="/en/whats-new/2.1.1"
          entry={{ ...entry, title: "Was ist neu in Intake 2.1.1" }}
        />
      </LanguageProvider>,
    );

    expect(screen.getByRole("link", { name: "Zur Übersicht" })).toHaveAttribute(
      "href",
      "/whats-new",
    );
  });

  // The markdown body is rendered by Astro and passed in as children now, rather than
  // produced by a hand-rolled parser inside the component.
  it("renders the release body it is given, with prose video constraints", () => {
    const view = render(
      <LanguageProvider lang="de" alternateHref="/en/whats-new/2.1.1">
        <WhatsNewEntry lang="de" alternateHref="/en/whats-new/2.1.1" entry={entry}>
          <figure>
            <video aria-label="Mahlzeit teilen" autoPlay loop muted playsInline src="/x.mp4" />
          </figure>
        </WhatsNewEntry>
      </LanguageProvider>,
    );

    const video = screen.getByLabelText("Mahlzeit teilen");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");

    const prose = view.container.querySelector(".prose");
    expect(prose?.className).toContain("md:[&_video]:max-w-[34rem]");
  });
});
