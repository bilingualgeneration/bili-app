import Login from "./Login";
import { FirebaseWrapper } from "@/components/FirebaseWrapper";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act } from "react-dom/test-utils";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthProvider } from "reactfire";
import { getAuth } from "firebase/auth";
import { IntlProvider, useIntl } from "react-intl";

describe("Login Component", () => {
  it("should render", () => {
    expect(1).toBe(1);
  });
});

afterEach(() => {
  cleanup();
});

describe("Login Component", () => {
  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });
  type schemaType = z.infer<typeof schema>;

  const { result } = renderHook(() =>
    useForm<schemaType>({
      resolver: zodResolver(schema),
    }),
  );

  const control = result.current.control;

  const messages = {
    "login.email": "Email address",
    "login.password": "Password",
    "login.google": "Continue with Google",
    "login.apple": "Continue with Apple",
    "login.continue": "Continue",
    "login.noAccount": "Don't have an account?",
    "login.signUp": "Sign up",
    "login.teacherWelcome": "Welcome to Teacher Login Page",
    "login.teacher": "Login as Teacher",
    "login.teacherUsername": "Username",
    "login.teacherPassword": "Password",
    "login.emailValidation": "Please enter a valid email address",
    "login.passwordValidation": "Please enter your password",
    "login.divider": "or",
  };

  beforeEach(async () => {
    await act(async () => {
      result.current.reset();
    });
  });

  it("should render an email input", () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <Login />
      </IntlProvider>,
    );
    const element = screen.getByTestId("login-email-input");
    expect(element).toBeDefined();
  });

  it("should render a password input", () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <Login />
      </IntlProvider>,
    );
    const element = screen.getByTestId("login-password-input");
    expect(element).toBeDefined();
  });

  it("should display error message for invalid email", async () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <Login />
      </IntlProvider>,
    );

    const input = await waitFor(() => {
      const input = screen
        .getByTestId("login-email-input")!
        .querySelector("input");
      expect(input).toBeTruthy();
      return input!;
    });
    fireEvent.focus(input);
    fireEvent.input(input, { target: { value: "1" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("should display error message for invalid password", async () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <Login />
      </IntlProvider>,
    );

    const input = await waitFor(() => {
      const input = screen
        .getByTestId("login-password-input")!
        .querySelector("input");
      expect(input).toBeTruthy();
      return input!;
    });
    fireEvent.focus(input);
    fireEvent.input(input, { target: { value: "1" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(
        screen.getByText("String must contain at least 8 character(s)"),
      ).toBeInTheDocument();
    });
  });

  it("should display error message for missing email", async () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <Login />
      </IntlProvider>,
    );

    const input = await waitFor(() => {
      const input = screen
        .getByTestId("login-email-input")!
        .querySelector("input");
      expect(input).toBeTruthy();
      return input!;
    });
    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });

  it("should display error message for missing password", async () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <Login />
      </IntlProvider>,
    );

    const input = await waitFor(() => {
      const input = screen
        .getByTestId("login-password-input")!
        .querySelector("input");
      expect(input).toBeTruthy();
      return input!;
    });
    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });
});

// example:
// render(
//     <AuthProvider>
//         <FirebaseWrapper>
//             <Login />
//         </FirebaseWrapper>
//     </AuthProvider>
//     );
