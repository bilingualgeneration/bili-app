import { beforeEach, describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageModeSelect } from "@/pages/SignUp/LanguageModeSelect";
import { IntlProvider } from "react-intl";

describe("SignUp Page Language Mode Slide", () => {
  const messages = {
    "languageMode.immersionTitle": "Spanish immersion",
    "languageMode.bilingualTitle": "Bilingual",
  };

  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <LanguageModeSelect />
      </IntlProvider>,
    );
  });
  it("should render", () => {
    expect(screen.getByTestId("language-select-continue-button")).toBeDefined();
    expect(screen.getByText("Spanish immersion")).toBeDefined();
    expect(screen.getByText("Bilingual")).toBeDefined();
  });

  // todo: add tests to ensure one was selected
  it("should enable the continue button when a Language mode is selected", async () => {
    // Initially, the continue button should be disabled
    expect(
      screen.getByTestId("language-select-continue-button"),
    ).toHaveAttribute("disabled", "true");

    // Simulate the user clicking the Bilingual option
    fireEvent.click(screen.getByText("Bilingual"));

    // After clicking, the continue button should be enabled
    await waitFor(() => {
      expect(
        screen.getByTestId("language-select-continue-button"),
      ).toHaveAttribute("disabled", "false");
    });
  });
});
