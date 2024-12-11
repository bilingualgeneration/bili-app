import { FormattedMessage, useIntl } from "react-intl";
import { getFirebaseAuth } from "@/components/Firebase";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonText,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UnauthedHeader } from "@/components/UnauthedHeader";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema } from "@bili/schema/user";

import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input } from "@/components/Input";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";
import closeIcon from "@/assets/icons/close.svg"; // Adjust the path if necessary
import "./ResetPasswordModal.scss";

interface FormInputs {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const auth = getFirebaseAuth();
  const intl = useIntl();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: zodResolver(userSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("credentials");
          break;
        default:
          setError("unknown");
          break;
      }
    }
    //history.push("/student-dashboard");
    setIsLoading(false);
  });

  const handlePasswordReset = async () => {
    //send an email with the link to reset the password
    setIsLoading(true);
    const email = getValues("email");

    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        setIsModalOpen(false); // Close the modal on successful reset
      } catch (error: any) {
        console.error("Error sending password reset email: ", error);
      }
    }
    setIsLoading(false);
  };
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
                    label={intl.formatMessage({ id: "common.password" })}
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
              <div className="ion-text-center ion-margin-top">
                <IonText>
                  {" "}
                  <a
                    href="#"
                    className="semibold"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents page reload
                      setIsModalOpen(true); // Opens the modal
                    }}
                  >
                    <FormattedMessage id="login.forgotPassword.link" />
                  </a>
                </IonText>
              </div>
              {error !== null && (
                <div className="ion-margin-top">
                  <IonText>
                    <p className="color-error text-sm ion-text-center">
                      {error === "credentials" && (
                        <FormattedMessage id="login.error.credentials" />
                      )}
                      {error === "unknown" && (
                        <FormattedMessage id="login.error.unknown" />
                      )}
                    </p>
                  </IonText>
                </div>
              )}
              <div className="ion-margin-top">
                <IonButton
                  className="margin-vertical-3"
                  data-testid="account-credentials-continue-button"
                  disabled={!isValid || isLoading}
                  expand="block"
                  shape="round"
                  type="submit"
                >
                  <FormattedMessage id="common.continue" />
                </IonButton>
              </div>
              <div className="ion-text-center ion-margin-top text-sm ion-hide">
                <IonText color="medium">
                  <FormattedMessage
                    id="common.noAccount"
                    defaultMessage="Don't have an account?"
                    description="Text at bottom of page that comes before the 'Sign up' link prompting users to sign up using the link if they don't have an account"
                  />{" "}
                  <IonText>
                    {" "}
                    <a href="/sign-up" className="semibold" style={{}}>
                      <FormattedMessage id="common.signUp" />
                    </a>
                  </IonText>
                </IonText>
              </div>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
      <IonModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        className="reset-password-modal"
        backdropDismiss={false}
      >
        <ResetPassword setIsModalOpen={setIsModalOpen} />
      </IonModal>
    </>
  );
};

const resetPasswordSchema = z.object({
  email: z.string(),
});

type ResetPassword = z.infer<typeof resetPasswordSchema>;
const ResetPassword: React.FC<any> = ({ setIsModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useInterfaceLanguage();
  const auth = getFirebaseAuth();
  const intl = useIntl();
  const { control, handleSubmit } = useForm<ResetPassword>({
    mode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
  });

  const handlePasswordReset = handleSubmit(async ({ email }) => {
    setIsLoading(true);
    auth.languageCode = language;
    try {
      await sendPasswordResetEmail(auth, email);
      setIsModalOpen(false); // Close the modal on successful reset
    } catch (error: any) {
      console.error("Error sending password reset email: ", error);
    }
    setIsLoading(false);
  });

  return (
    <div className="modal-content">
      <img
        src={closeIcon}
        alt="Close"
        className="close-button"
        onClick={() => setIsModalOpen(false)}
      />
      <IonText>
        <h2 className="text-lg semibold">
          <FormattedMessage id="login.forgotPassword.prompt" />
        </h2>
      </IonText>
      <div className="text-sm email-input">
        <Input
          className="text-xl"
          control={control}
          disabled={isLoading}
          label={intl.formatMessage({ id: "common.email" })}
          labelPlacement="above"
          required={true}
          name="email"
          fill="outline"
          helperText=""
          testId="login-email-input"
          type="email"
        />
      </div>
      <IonButton
        expand="block"
        fill="solid"
        shape="round"
        className="reset-button color-selva text-sm semibold"
        onClick={handlePasswordReset}
        disabled={isLoading}
      >
        <FormattedMessage id="login.forgotPassword.resetButton" />
      </IonButton>
    </div>
  );
};
