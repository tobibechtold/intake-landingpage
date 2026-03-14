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
      <MemoryRouter initialEntries={["/de/whats-new/2.1.1"]}>
        <LanguageProvider>
          <Routes>
            <Route
              path="/de/whats-new/:version"
              element={
                <>
                  <LanguageSwitcher />
                  <LocationDisplay />
                </>
              }
            />
            <Route
              path="/whats-new/:version"
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

    expect(screen.getByTestId("location-display")).toHaveTextContent("/whats-new/2.1.1");
  });
});
