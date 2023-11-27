import { beforeEach, describe, test, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { RoleSelect } from "@/pages/SignUp/RoleSelect";
import { IntlProvider } from "react-intl";

describe("SignUp Page Role Select Slide", () => {
  const messages = {
    "signUp.teacher": "Teacher",
    "signUp.parent": "Parent",
  };

  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <RoleSelect teacherSlide={2} parentSlide={1} />
      </IntlProvider>,
    );
  });

  it("should render", () => {
    // Check if the component rendered with all necessary parts
    expect(screen.getByTestId("role-select-continue-button")).toBeDefined();
    expect(screen.getByText("Teacher")).toBeDefined();
    expect(screen.getByText("Parent")).toBeDefined();
  });

  it("should enable the continue button when a role is selected", async () => {
    // Initially, the continue button should be disabled
    expect(screen.getByTestId("role-select-continue-button")).toHaveAttribute(
      "disabled",
      "true",
    );

    // Simulate the user clicking the Parent option
    fireEvent.click(screen.getByText("Parent"));

    // After clicking, the continue button should be enabled
    await waitFor(() => {
      expect(screen.getByTestId("role-select-continue-button")).toHaveAttribute(
        "disabled",
        "false",
      );
    });
  });
});
