import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResetPassword from "./ResetPassword";

describe("ResetPassword Compoent", () => {
  it("renders Login page without crashing", () => {
    const { baseElement } = render(<ResetPassword />);
    expect(baseElement).toBeDefined();
  });
});
