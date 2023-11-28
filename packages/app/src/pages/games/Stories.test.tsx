import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Stories from "./Memory";

describe("<Stories />", () => {
  it("should render the title", () => {
    const { baseElement } = render(<Stories />);
    expect(baseElement).toBeDefined();
  });
});
