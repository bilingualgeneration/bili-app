import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
        <App />
    );
    expect(baseElement).toBeDefined();
  });
});
