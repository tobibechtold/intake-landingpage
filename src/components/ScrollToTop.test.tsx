import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  it("scrolls to the top when navigating to a whats new detail page", () => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      value: scrollToMock,
      writable: true,
    });

    render(
      <MemoryRouter initialEntries={["/whats-new"]}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/whats-new"
            element={<Link to="/whats-new/2.1.1">Read update</Link>}
          />
          <Route path="/whats-new/:version" element={<div>Detail page</div>} />
        </Routes>
      </MemoryRouter>
    );

    scrollToMock.mockClear();
    fireEvent.click(screen.getByRole("link", { name: "Read update" }));

    expect(scrollToMock).toHaveBeenCalledWith({ left: 0, top: 0 });
  });

  it("scrolls to a hash target when navigating to a section on another page", async () => {
    const scrollToMock = vi.fn();
    const originalGetElementById = document.getElementById.bind(document);

    Object.defineProperty(window, "scrollTo", {
      value: scrollToMock,
      writable: true,
    });

    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });

    document.getElementById = vi.fn((id: string) => {
      if (id === "faq") {
        return {
          getBoundingClientRect: () => ({ top: 640 }),
        } as unknown as HTMLElement;
      }

      return originalGetElementById(id);
    });

    render(
      <MemoryRouter initialEntries={["/funktionen"]}>
        <ScrollToTop />
        <Routes>
          <Route path="/funktionen" element={<Link to="/#faq">FAQ</Link>} />
          <Route
            path="/"
            element={<div data-site-header-shell style={{ marginTop: 16, height: 64 }}>Home page</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    scrollToMock.mockClear();
    fireEvent.click(screen.getByRole("link", { name: "FAQ" }));

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledWith({ left: 0, top: 624, behavior: "smooth" });
    });

    document.getElementById = originalGetElementById;
  });
});
