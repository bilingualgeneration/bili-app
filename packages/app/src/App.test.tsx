import { expect, describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";
import { FirebaseWrapper } from "@/components/FirebaseWrapper";

describe("App Component", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <FirebaseWrapper>
        <App />
      </FirebaseWrapper>,
    );
    expect(baseElement).toBeDefined();
  });
});
