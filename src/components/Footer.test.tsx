import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";

describe("Footer", () => {
  it("links the changelog label to the localized what's new overview", () => {
    render(
      <MemoryRouter initialEntries={["/de"]}>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Was ist neu" })).toHaveAttribute(
      "href",
      "/de/whats-new"
    );
  });
});
