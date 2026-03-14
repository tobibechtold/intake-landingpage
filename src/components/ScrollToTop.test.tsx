import { fireEvent, render, screen } from "@testing-library/react";
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
});
