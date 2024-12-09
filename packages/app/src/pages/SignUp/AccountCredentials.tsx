import { I18nMessage } from "@/components/I18nMessage";
import { Input } from "@/components/Input";
import { IonButton, IonCheckbox, IonLabel, IonText } from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useI18n } from "@/hooks/I18n";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./AccountCredentials.scss";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

// todo: expand Input to include checkbox

export const AccountCredentials: React.FC = () => {
  const { getText } = useI18n();
  const { data, setData, pushPage } = useSignUpData();
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
        <Input
          label={getText("common.fullName", 1, "unauthed")}
          labelPlacement="above"
          required={true}
          name="name"
          fill="outline"
          control={control}
          helperText=""
          testId="account-credentials-name-input"
          type="text"
        />

        <div className="ion-margin-top">
          <Input
            label={getText("common.email", 1, "unauthed")}
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
            label={getText("common.password", 1, "unauthed")}
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

        <div className="ion-margin-top" style={{ display: "flex" }}>
          <IonCheckbox
            labelPlacement="end"
            justify="start"
            checked={acceptedTerms}
            onIonChange={(e) => setAcceptedTerms(e.detail.checked)}
          />
          <IonText class="ion-text-wrap" style={{ marginLeft: "0.625rem" }}>
            <p>
              <I18nMessage id="common.termsAgree" languageSource="unauthed" />
              <a
                href="https://thebiliapp.com/terms/"
                style={{ color: "inherit", textDecoration: "inherit" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IonText
                  color="primary"
                  style={{ fontWeight: "bold", marginRight: "0.25rem" }}
                >
                  <I18nMessage id="common.terms" languageSource="unauthed" />
                </IonText>
              </a>
            </p>

            <p>
              <I18nMessage id="common.termsAgree2" languageSource="unauthed" />
              <a
                href="https://thebiliapp.com/privacy-policy/"
                style={{ color: "inherit", textDecoration: "inherit" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IonText
                  color="primary"
                  style={{ fontWeight: "bold", marginLeft: "0.25rem" }}
                >
                  <I18nMessage id="common.terms2" languageSource="unauthed" />
                </IonText>
              </a>
            </p>
          </IonText>
        </div>

        <div className="ion-margin-top">
          <IonButton
            data-testid="account-credentials-continue-button"
            disabled={!isValid || !acceptedTerms}
            expand="block"
            shape="round"
            type="submit"
          >
            <I18nMessage id="common.continue" languageSource="unauthed" />
          </IonButton>
        </div>

        <div className="ion-text-center ion-margin-top">
          <IonText color="medium">
            <I18nMessage id="common.haveAccount" languageSource="unauthed" />{" "}
            <IonText>
              {" "}
              <a href="/login">
                <I18nMessage id="common.logIn" languageSource="unauthed" />
              </a>
            </IonText>
          </IonText>
        </div>
      </form>
    </>
  );
};
