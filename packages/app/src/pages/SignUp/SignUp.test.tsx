import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { SignUp } from "@/pages/SignUp/SignUp";

describe.only("SignUp Component", () => {
  it("should render", () => {
    const { baseElement } = render(<SignUp />);
    expect(baseElement).toBeDefined();
  });
});
