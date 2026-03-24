import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders switch-focused messaging, trust chips, and the demo video", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /switch to calorie tracking without the subscription/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /download on the app store/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /why people switch/i })
    ).toHaveAttribute("href", "#why-switch");
    expect(screen.getByText(/one-time purchase/i)).toBeInTheDocument();
    expect(screen.getByText(/no account required/i)).toBeInTheDocument();
    expect(screen.getByText(/100% on-device/i)).toBeInTheDocument();
    expect(container.querySelector("video")).toBeInTheDocument();
  });
});
