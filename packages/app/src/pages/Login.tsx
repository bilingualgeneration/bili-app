import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { userSchema } from "@bili/schema/user";

import React from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { UnauthedHeader } from "@/components/UnauthedHeader";

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
      <div
        className="content-wrapper"
        style={{ maxWidth: 580, margin: "auto" }}
      >
        <IonCard>
          <IonCardContent>
            <form onSubmit={onSubmit}>
              <div className="text-md semibold color-barro">
                <div>
                  <Input
                    label={intl.formatMessage({
                      id: "common.email",
                      defaultMessage: "Your email",
                      description: "Input label for email",
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
                      description: "Input label for user's password",
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
              </div>
              <div className="ion-margin-top">
                <IonButton
                  className="margin-vertical-3"
                  data-testid="account-credentials-continue-button"
                  disabled={!isValid}
                  expand="block"
                  shape="round"
                  type="submit"
                >
                  <FormattedMessage
                    id="common.continue"
                    defaultMessage="Continue"
                    description="Button label to continue"
                  />
                </IonButton>
              </div>
              <div className="ion-text-center ion-margin-top text-sm">
                <IonText color="medium">
                  <FormattedMessage
                    id="common.noAccount"
                    defaultMessage="Don't have an account?"
                    description="Text at bottom of page that comes before the 'Sign up' link prompting users to sign up using the link if they don't have an account"
                  />{" "}
                  <IonText>
                    {" "}
                    <a href="/sign-up" className="semibold" style={{}}>
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
