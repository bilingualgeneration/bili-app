import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Intruder from "./Intruder";

describe("<Intruder />", () => {
  it("should render the title", () => {
    const { baseElement } = render(<Intruder />);
    expect(baseElement).toBeDefined();
  });
});
