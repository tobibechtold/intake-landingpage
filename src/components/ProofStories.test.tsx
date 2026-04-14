import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ProofStories from "./ProofStories";

describe("ProofStories", () => {
  it("uses the current localized landing screenshots instead of the legacy numbered files", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <ProofStories />
        </LanguageProvider>
      </MemoryRouter>
    );

    const imageSources = screen
      .getAllByRole("img")
      .map((image) => image.getAttribute("src"));

    expect(imageSources).toEqual([
      "/screenshots/landing/de-add-food.png",
      "/screenshots/landing/de-statistics.png",
      "/screenshots/landing/de-dashboard.png",
    ]);
    expect(imageSources.join(" ")).not.toMatch(/\/screenshots\/de-\d+-/);
  });
});
