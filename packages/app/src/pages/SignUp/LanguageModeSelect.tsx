import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonItem,
  IonInput,
  IonText,
} from "@ionic/react";
import { useIntl, FormattedMessage } from "react-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useForm } from "react-hook-form";
import { RadioCard } from "../../components/RadioCard";
import { ExtendedRadioOption, ExtendedRadio } from "@/components/ExtendedRadio";

export const LanguageModeSelect: React.FC = () => {
  const intl = useIntl();
  const schema = z.object({
    isImmersive: z.boolean(),
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const { data, setData, pushPage } = useSignUpData();

  const spanishOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "120%",
                letterSpacing: "0.2px",
              }}
            >
              ES
            </div>
          }
          title={intl.formatMessage({
            id: "languageMode.immersionTitle",
            defaultMessage: "Spanish Immersion",
            description: "Title of the Spanish immersion mode option",
          })}
          content={intl.formatMessage({
            id: "languageMode.immersion",
            defaultMessage:
              "Choose this setting if you want your child to learn all content and activities in the Spanish language.",
            description: "Description of the Spanish immersion option",
          })}
          iconBackgroundColor="var(--Desierto-Desierto)"
        />
      </div>
    ),
    value: true,
  };

  const billingualOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div
              style={{
                color: "#000000",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "100%",
                letterSpacing: "0.2px",
              }}
            >
              EN
              <br />
              ES
            </div>
          }
          title={intl.formatMessage({
            id: "languageMode.bilingualTitle",
            defaultMessage: "Bilingual",
            description: "Title of the Bilingual mode option",
          })}
          content={intl.formatMessage({
            id: "languageMode.bilingual",
            defaultMessage:
              "Choose this setting if you want your child to learn Spanish with English supports and translations.",
            description: "Description of the Bilingual mode option",
          })}
          iconBackgroundColor="var(--Sol-High)"
        />
      </div>
    ),
    value: false,
  };

  const onSubmit = handleSubmit((responses) => {
    //add logic where to store user's choice

    setData({
      ...data,
      ...responses,
    });
    // @ts-ignore todo: better typing
    if (data.role === "teacher") {
      pushPage("teacherAccountCredentials");
    }
    // @ts-ignore todo: better typing
    if (data.role === "parent") {
      pushPage("parentAccountCredentials");
    }
  });

  return (
    <>
      <form className="radio-button-select">
        <IonText className="ion-text-center">
          <h2 className="text-3xl semibold color-suelo">
            <FormattedMessage
              id="languageMode.settings"
              defaultMessage="Choose your settings"
              description="User can choose if they want bilingual settings or English assisted settings"
            />
          </h2>
        </IonText>
        <ExtendedRadio
          control={control}
          name="isImmersive"
          options={[spanishOption, billingualOption]}
        />
        <IonButton
          data-testid="language-select-continue-button"
          disabled={!isValid}
          shape="round"
          type="button"
          onClick={onSubmit}
        >
          <FormattedMessage
            id="common.continue"
            defaultMessage="Continue"
            description="Button label to continue"
          />
        </IonButton>
      </form>
    </>
  );
};
