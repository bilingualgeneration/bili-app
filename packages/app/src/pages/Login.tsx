import {
  FormattedMessage,
  useIntl,
} from "react-intl";
import {getFirebaseAuth} from '@/components/Firebase';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonText
} from "@ionic/react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {UnauthedHeader} from "@/components/UnauthedHeader";
import {useState} from 'react';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";





import { userSchema } from "@bili/schema/user";

import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input } from "@/components/Input";


interface FormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const auth = getFirebaseAuth();
  const intl = useIntl();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(userSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      // todo: need to present error message
      console.error("Error signing in with email and password:", error);
    }
    //history.push("/student-dashboard");
    setIsLoading(false);
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
                    control={control}
		    disabled={isLoading}


		  
                    label={intl.formatMessage({
                      id: "common.email",
                      defaultMessage: "Your email",
                      description: "Input label for email",
                    })}
                    labelPlacement="above"
                    required={true}
                    name="email"
                    fill="outline"
                    helperText=""
                    testId="login-email-input"
                    type="email"
                  />
                </div>

                <div className="ion-margin-top">
                  <Input
                    control={control}
		    disabled={isLoading}

		  
                    label={intl.formatMessage({
                      id: "common.password",
                      defaultMessage: "Password",
                      description: "Input label for user's password",
                    })}
                    labelPlacement="above"
                    required={true}
                    name="password"
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
                  disabled={!isValid || isLoading}
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
