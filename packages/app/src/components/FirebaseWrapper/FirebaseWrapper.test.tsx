import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { FirebaseWrapper } from "@/components/FirebaseWrapper";

describe("FirebaseWrapper Component", () => {
  it("should render with children", () => {
    const element = render(
      <FirebaseWrapper>
        <div data-testid="child"></div>
      </FirebaseWrapper>,
    );
    expect(screen.getByTestId("child")).toBeDefined();
  });
});
