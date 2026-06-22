import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Hero from "./Hero";

const SwitchToEnglishButton = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/en")}>Switch to English</button>;
};

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
      <MemoryRouter initialEntries={["/en"]}>
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
    expect(container.querySelector("#hero")).toBeInTheDocument();
    expect(container.querySelector("video")).toBeInTheDocument();
    expect(container.querySelector("video source")).toHaveAttribute("src", "/promo-video-en.mp4");
    expect(container.querySelector(".hero-device-shell")).not.toBeInTheDocument();
    expect(container.querySelector(".h-\\[28rem\\]")).not.toBeInTheDocument();
  });

  it("reloads the locale-specific demo video when switching languages without a page reload", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <SwitchToEnglishButton />
          <Hero />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(container.querySelector("video source")).toHaveAttribute("src", "/promo-video.mp4");
    loadSpy.mockClear();

    fireEvent.click(screen.getByRole("button", { name: /switch to english/i }));

    await waitFor(() => {
      expect(container.querySelector("video source")).toHaveAttribute("src", "/promo-video-en.mp4");
    });
    expect(loadSpy).toHaveBeenCalled();
  });
});
