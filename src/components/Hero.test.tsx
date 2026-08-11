import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Hero from "./Hero";

describe("Hero", () => {
  let loadSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    loadSpy = vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
  });

  afterEach(() => {
    loadSpy.mockRestore();
  });

  it("renders switch-focused messaging, trust chips, and the demo video", () => {
    const { container } = render(
        <LanguageProvider lang="en" alternateHref="/">
          <Hero />
        </LanguageProvider>
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
    expect(container.querySelector("#hero")).toBeInTheDocument();
    expect(container.querySelector("video")).toBeInTheDocument();
    expect(container.querySelector("video source")).toHaveAttribute("src", "/promo-video-en.mp4");
    expect(container.querySelector(".hero-device-shell")).not.toBeInTheDocument();
    expect(container.querySelector(".h-\\[28rem\\]")).not.toBeInTheDocument();
  });

  // The former "switch language without a page reload" case is gone: locale is a static
  // property of the route now, so changing it is a full navigation. What still matters is
  // that each locale renders its own video source.
  it("renders the German demo video on a German page", () => {
    const { container } = render(
      <LanguageProvider lang="de" alternateHref="/en">
        <Hero />
      </LanguageProvider>,
    );

    expect(container.querySelector("video source")).toHaveAttribute("src", "/promo-video.mp4");
  });
});
