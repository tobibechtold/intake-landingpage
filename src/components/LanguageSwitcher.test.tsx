import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

describe("LanguageSwitcher", () => {
  it("preserves the whats new version when switching locales on entry pages", () => {
    render(
        <LanguageProvider lang="de" alternateHref="/">
          
        </LanguageProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(screen.getByTestId("location-display")).toHaveTextContent("/en/whats-new/2.1.1");
  });

  it("switches between localized evergreen routes", () => {
    render(
        <LanguageProvider lang="de" alternateHref="/">
          
        </LanguageProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(screen.getByTestId("location-display")).toHaveTextContent("/en/features");
  });

  it("preserves comparison detail slugs when switching locales", () => {
    render(
        <LanguageProvider lang="de" alternateHref="/">
          
        </LanguageProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      "/en/comparisons/yazio-alternative"
    );
  });
});
