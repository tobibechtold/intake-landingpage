import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

describe("LanguageSwitcher", () => {
  it("preserves the whats new version when switching locales on entry pages", () => {
    render(
      <MemoryRouter initialEntries={["/whats-new/2.1.1"]}>
        <LanguageProvider>
          <Routes>
            <Route
              path="/whats-new/:version"
              element={
                <>
                  <LanguageSwitcher />
                  <LocationDisplay />
                </>
              }
            />
            <Route
              path="/en/whats-new/:version"
              element={
                <>
                  <LanguageSwitcher />
                  <LocationDisplay />
                </>
              }
            />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(screen.getByTestId("location-display")).toHaveTextContent("/en/whats-new/2.1.1");
  });

  it("switches between localized evergreen routes", () => {
    render(
      <MemoryRouter initialEntries={["/funktionen"]}>
        <LanguageProvider>
          <Routes>
            <Route
              path="/funktionen"
              element={
                <>
                  <LanguageSwitcher />
                  <LocationDisplay />
                </>
              }
            />
            <Route
              path="/en/features"
              element={
                <>
                  <LanguageSwitcher />
                  <LocationDisplay />
                </>
              }
            />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(screen.getByTestId("location-display")).toHaveTextContent("/en/features");
  });

  it("preserves comparison detail slugs when switching locales", () => {
    render(
      <MemoryRouter initialEntries={["/vergleiche/yazio-alternative"]}>
        <LanguageProvider>
          <Routes>
            <Route
              path="/vergleiche/:slug"
              element={
                <>
                  <LanguageSwitcher />
                  <LocationDisplay />
                </>
              }
            />
            <Route
              path="/en/comparisons/:slug"
              element={
                <>
                  <LanguageSwitcher />
                  <LocationDisplay />
                </>
              }
            />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      "/en/comparisons/yazio-alternative"
    );
  });
});
