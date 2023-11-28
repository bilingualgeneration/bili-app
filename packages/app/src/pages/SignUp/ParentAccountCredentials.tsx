import { DividerText } from "@/components/DividerText";
import { IonButton, IonCheckbox, IonLabel, IonText } from "@ionic/react";

import { Input } from "@/components/Input";
import { useForm, SubmitHandler } from "react-hook-form";

import { useSwiper } from "swiper/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";

import AppleIcon from "@/assets/icons/apple.svg?react";
import GoogleIcon from "@/assets/icons/google.svg?react";

import "./AccountCredentials.css";
import { useIntl, FormattedMessage } from "react-intl";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

// todo: expand Input to include checkbox

export type ParentAccountCredentialsProps = {
  nextSlide: number;
  previousSlide: number;
};

export const ParentAccountCredentials: React.FC<
  ParentAccountCredentialsProps
> = ({ nextSlide, previousSlide }) => {
  const intl = useIntl();
  const { data, setData } = useSignUpData();
  const swiper = useSwiper();
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    //tos: z.literal<boolean>(true),
    //marketingUpdates: z.boolean()
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((response) => {
    setData({
      ...data,
      ...response,
    });
    swiper.slideTo(nextSlide);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          label={intl.formatMessage({
            id: "signUpParent.name",
            defaultMessage: "Your full name*",
            description:
              "Users who choose parent must enter their name as requirement",
          })}
          labelPlacement="above"
          name="name"
          fill="outline"
          control={control}
          helperText=""
          testId="account-credentials-name-input"
          type="text"
        />

        <div className="ion-margin-top">
          <Input
            label={intl.formatMessage({
              id: "signUpParent.email",
              defaultMessage: "Your email*",
              description:
                "Users who choose parent must enter their email as requirement",
            })}
            labelPlacement="above"
            required={true}
            name="email"
            control={control}
            fill="outline"
            helperText=""
            testId="account-credentials-email-input"
            type="email"
          />
        </div>

        <div className="ion-margin-top">
          <Input
            label={intl.formatMessage({
              id: "signUpParent.password",
              defaultMessage: "Password*",
              description:
                "Users who choose parent must enter a password as a requirement",
            })}
            labelPlacement="above"
            required={true}
            name="password"
            control={control}
            fill="outline"
            helperText=""
            testId="account-credentials-password-input"
            type="password"
          />
        </div>

        <DividerText
          className="ion-margin-top"
          text={intl.formatMessage({
            id: "login.divider",
            defaultMessage: "or login using",
            description:
              "Divider that gives user option to login using Google or Apple below",
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
            id="login.google"
            defaultMessage="Continue with Google"
            description="Continue the login process with Google"
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
            id="login.apple"
            defaultMessage="Continue with Apple"
            description="Continue the login process with Apple"
          />
        </IonButton>

        <div className="ion-margin-top">
          <IonCheckbox labelPlacement="end" justify="start">
            <IonText class="ion-text-wrap">
              <IonText color="primary" style={{ fontWeight: "bold" }}>
                <FormattedMessage
                  id="signUpParent.terms"
                  defaultMessage="Terms of Service. "
                  description="Terms of Service for parents to agree to in sign up process."
                />
              </IonText>
              <FormattedMessage
                id="signUpParent.termsAgree"
                defaultMessage="I agree to the Terms of Service. I have read and understand the Privacy Policy"
                description="Terms of Service for parents to agree to in sign up process."
              />
            </IonText>
          </IonCheckbox>
        </div>

        <div className="ion-margin-top">
          <IonCheckbox justify="start" labelPlacement="end">
            <FormattedMessage
              id="signUpParent.marketing"
              defaultMessage="I want to receive marketing updates"
              description="Area for parents to check off if they wish to receive marketing emails during sign up process"
            />
          </IonCheckbox>
        </div>

        <div className="ion-margin-top">
          <IonButton
            data-testid="account-credentials-continue-button"
            disabled={!isValid}
            expand="block"
            shape="round"
            type="submit"
          >
            <FormattedMessage
              id="signUpParent.continue"
              defaultMessage="Continue"
              description="Continue button after parents have filled out all required info"
            />
          </IonButton>
        </div>

        <div className="ion-text-center ion-margin-top">
          <IonText color="medium">
            <FormattedMessage
              id="signUpTeacher.haveAccount"
              defaultMessage="Already have an account?"
              description="Asking parents if they have an account so that they don't need to create a new one"
            />{" "}
            <IonText>
              {" "}
              <a href="/login">
                <FormattedMessage
                  id="signUpParent.haveAccountLogin"
                  defaultMessage="Log in"
                  description="Log in link for parents in case they have an account so that they don't need to create a new one"
                />
              </a>{" "}
            </IonText>
          </IonText>
        </div>
      </form>
    </>
  );
};
