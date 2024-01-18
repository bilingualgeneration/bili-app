import { DividerText } from "@/components/DividerText";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { userSchema } from "@bili/schema/user";

import AppleIcon from "@/assets/icons/apple.svg?react";
import GoogleIcon from "@/assets/icons/google.svg?react";

import React from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { UnauthedHeader } from "@/components/UnauthedHeader";

const signOut = (auth: { isAuthed?: boolean; user?: null; signOut?: any }) => {
  auth.signOut();
};

const signInWithGoogle = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

const handleEmailPasswordSignIn = async (
  auth: Auth,
  email: string,
  password: string,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email and password:", error);
  }
};

interface FormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  //uncomment when will be implementing Firebase Auth
  const auth = useAuth();
  // const {status, data: signinResult} = useSigninCheck();
  const intl = useIntl();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(userSchema),
  });
  const history = useHistory();

  const onSubmit = handleSubmit(async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    history.push("/student-dashboard");
  });

  return (
    <>
      <UnauthedHeader
        backButtonOnClick={() => {
          history.goBack();
        }}
      />
      <div className="content-wrapper">
        <IonCard>
          <IonCardContent>
            <form onSubmit={onSubmit}>
              <div className="ion-margin-top">
                <Input
                  label={intl.formatMessage({
                    id: "common.email",
                    defaultMessage: "Email address",
                    description:
                      "Input area label where users must enter their email",
                  })}
                  labelPlacement="above"
                  required={true}
                  name="email"
                  control={control}
                  fill="outline"
                  helperText=""
                  testId="login-email-input"
                  type="email"
                />
              </div>

              <div className="ion-margin-top">
                <Input
                  label={intl.formatMessage({
                    id: "common.password",
                    defaultMessage: "Password",
                    description:
                      "Text above input area showing users that they must enter a password",
                  })}
                  labelPlacement="above"
                  required={true}
                  name="password"
                  control={control}
                  fill="outline"
                  helperText=""
                  testId="login-password-input"
                  type="password"
                />
              </div>

              <DividerText
                className="ion-margin-top"
                text={intl.formatMessage({
                  id: "login.divider",
                  defaultMessage: "or",
                  description:
                    "Divider text that separates the login page into two sections: 1) for users to log in using credentials 2) for users to login using Google or Apple",
                })}
              />

              <IonButton
                color="medium"
                className="ion-margin-top"
                disabled
                expand="block"
                fill="outline"
                style={{ opacity: 0.2 }}
              >
                <span style={{ marginRight: "1rem" }}>
                  <GoogleIcon />
                </span>{" "}
                <FormattedMessage
                  id="common.google"
                  defaultMessage="Continue with Google"
                  description="Button for users to continue the login/registration process using Google"
                />
              </IonButton>

              <IonButton
                color="medium"
                className="ion-margin-top"
                disabled
                expand="block"
                fill="outline"
                style={{ opacity: 0.2 }}
              >
                <span style={{ marginRight: "1rem" }}>
                  <AppleIcon />
                </span>
                <FormattedMessage
                  id="common.apple"
                  defaultMessage="Continue with Apple"
                  description="Button for users to continue the login/registration process using Apple"
                />
              </IonButton>

              <div className="ion-margin-top">
                <IonButton
                  data-testid="account-credentials-continue-button"
                  disabled={!isValid}
                  expand="block"
                  shape="round"
                  type="submit"
                >
                  <FormattedMessage
                    id="common.continue"
                    defaultMessage="Continue"
                    description="Button for users to continue on to the next page"
                  />
                </IonButton>
              </div>
              <div className="ion-text-center ion-margin-top">
                <IonText color="medium">
                  <FormattedMessage
                    id="common.noAccount"
                    defaultMessage="Don't have an account?"
                    description="Text at bottom of page that comes before the 'Sign up' link prompting users to sign up using the link if they don't have an account"
                  />{" "}
                  <IonText>
                    {" "}
                    <a href="/sign-up">
                      <FormattedMessage
                        id="common.signUp"
                        defaultMessage="Sign Up"
                        description="Text that is also a link that prompts users to sign up using the 'Sign up' link if they don't have an account"
                      />
                    </a>
                  </IonText>
                </IonText>
              </div>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
    </>
  );
};

export default Login;
