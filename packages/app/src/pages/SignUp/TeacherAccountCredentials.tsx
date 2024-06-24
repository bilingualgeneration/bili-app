import { IonButton, IonCheckbox, IonLabel, IonText } from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";

import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useState } from "react";

// todo: expand Input to include checkbox

export const TeacherAccountCredentials: React.FC = () => {
  const intl = useIntl();
  const { data, setData, pushPage } = useSignUpData();
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    school: z.string().min(1),
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
    pushPage("complete");
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="text-md semibold color-barro">
          <Input
            label={intl.formatMessage({
              id: "common.fullName",
              defaultMessage: "Your full name",
              description: "Input label for user's full name",
            })}
            labelPlacement="above"
            required={true}
            name="name"
            fill="outline"
            control={control}
            helperText=""
            testId="teacher-account-credentials-name-input"
            type="text"
          />

          <div className="ion-margin-top">
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
              testId="teacher-account-credentials-email-input"
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
              testId="teacher-account-credentials-password-input"
              type="password"
            />
          </div>

          <div className="ion-margin-top" style={{display: 'flex'}}>
          <IonCheckbox labelPlacement="end" justify="start" checked={acceptedTerms} onIonChange={e => setAcceptedTerms(e.detail.checked)} />
            <IonText class="ion-text-wrap" style={{marginLeft: '10px',}}>
              <p>
                <FormattedMessage
                  id="common.termsAgree"
                  defaultMessage="I agree to the "
                  description="Terms of Service where users can check off if they agree while in sign up process."
                />

                <a href="https://thebiliapp.com/terms/" style={{ color: 'inherit', textDecoration: 'inherit' }} target="_blank" rel="noopener noreferrer">
                  <IonText
                    color="primary"
                    style={{ fontWeight: "bold", marginRight: 8 }}
                  >
                    <FormattedMessage
                      id="common.terms"
                      defaultMessage="Terms of Service."
                      description="Terms of Service link for users to have option to click and read before agreeing to in sign up process."
                    />
                  </IonText>
                </a>
              </p>
             
             <p>
              <FormattedMessage
                  id="common.termsAgree2"
                  defaultMessage="I have read and understand "
                  
                />
                
                <a href="https://thebiliapp.com/privacy-policy/" style={{ color: 'inherit', textDecoration: 'inherit' }} target="_blank" rel="noopener noreferrer">
                  <IonText
                    color="primary"
                    style={{ fontWeight: "bold", marginLeft: '6pt', }}
                  >
                    <FormattedMessage
                      id="common.terms2"
                      defaultMessage="Privacy Policy."
                      description="Terms of Service link for users to have option to click and read before agreeing to in sign up process."
                    />
                  </IonText>
                </a>

             </p>
              
            </IonText>
        </div>
        </div>
        <IonButton
          data-testid="teacher-account-credentials-continue-button"
          disabled={!isValid || !acceptedTerms}
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

        <div className="ion-text-center margin-top-2 text-sm">
          <IonText>
            <FormattedMessage
              id="common.haveAccount"
              defaultMessage="Already have an account?"
              description="link text if user already has an account"
            />
            <IonText>
              {" "}
              <a
                href="/login"
                style={{ textDecoration: "none" }}
                className="semibold"
              >
                <FormattedMessage
                  id="common.logIn"
                  defaultMessage="Log in"
                  description="label to log in"
                />
              </a>{" "}
            </IonText>
          </IonText>
        </div>
      </form>
    </>
  );
};
