import { ExtendedRadioOption, ExtendedRadio } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
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
import { RadioCard } from "../../components/RadioCard";
import { useForm } from "react-hook-form";
import { useI18n } from "@/hooks/I18n";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LanguageModeSelect: React.FC = () => {
  const { getText } = useI18n();
  const schema = z.object({
    studentLanguage: z.enum(["en", "es", "es.en"]),
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

  const englishOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "1.5rem",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "120%",
                letterSpacing: "0.0125rem",
              }}
            >
              ES
            </div>
          }
          title={getText("languageMode.engImmersionTitle", 1, "unauthed")}
          content={getText("languageMode.engImmersion", 1, "unauthed")}
          iconBackgroundColor="#0045A1"
        />
      </div>
    ),
    value: "en",
  };

  const spanishOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "1.5rem",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "120%",
                letterSpacing: "0.0125rem",
              }}
            >
              ES
            </div>
          }
          title={getText("languageMode.immersionTitle", 1, "unauthed")}
          content={getText("languageMode.immersion", 1, "unauthed")}
          iconBackgroundColor="#F0091B"
        />
      </div>
    ),
    value: "es",
  };

  const billingualOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "1.25rem",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "100%",
                letterSpacing: "0.0125rem",
              }}
            >
              EN
              <br />
              ES
            </div>
          }
          title={getText("languageMode.bilingualTitle", 1, "unauthed")}
          content={getText("languageMode.bilingual", 1, "unauthed")}
          iconBackgroundColor="#006A67"
        />
      </div>
    ),
    value: "es.en",
  };

  const onSubmit = handleSubmit((responses) => {
    //add logic where to store user's choice

    setData({
      ...data,
      ...responses,
    });
    pushPage("accountCredentials");
  });

  return (
    <>
      <form className="radio-button-select">
        <IonText className="ion-text-center">
          <h2 className="text-3xl semibold color-suelo">
            <I18nMessage id="languageMode.settings" languageSource="unauthed" />
          </h2>
        </IonText>
        <ExtendedRadio
          control={control}
          name="studentLanguage"
          options={[billingualOption, spanishOption, englishOption]}
        />
        <IonButton
          data-testid="language-select-continue-button"
          disabled={!isValid}
          shape="round"
          type="button"
          onClick={onSubmit}
        >
          <I18nMessage id="common.continue" languageSource="unauthed" />
        </IonButton>
      </form>
    </>
  );
};
