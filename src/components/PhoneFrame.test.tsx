import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PhoneFrame from "./PhoneFrame";

describe("PhoneFrame", () => {
  it("uses viewport insets that match the bezel cutout", () => {
    const { container } = render(
      <PhoneFrame>
        <div>content</div>
      </PhoneFrame>
    );

    const viewport = container.querySelector(".absolute.overflow-hidden");

    expect(viewport).toHaveStyle({
      top: "2.4%",
      left: "5.1%",
      right: "5.1%",
      bottom: "2.08%",
    });
    expect(viewport).toHaveClass("rounded-[8%]");
  });
});
