import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonProgressBar,
  IonItem,
  IonInput,
  IonText,
  IonToggle,
} from "@ionic/react";
import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { FormattedMessage, useIntl } from "react-intl";
import { Popover } from "@/components/Popover";
import { RadioCard } from "@/components/RadioCard";
import { Toggle } from "@/components/Toggle";
import { useAddClassroom } from "./AddClassroomContext";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Question from "@/assets/icons/question.svg?react";

export const AddClassroomLanguage: React.FC = () => {
  const intl = useIntl();
  const schema = z.object({
    allowLanguageToggle: z.boolean(),
    isInclusive: z.boolean(),
    language: z.string(),
  });
  const {
    allowLanguageToggle,
    isInclusive,
    language,
    setAllowLanguageToggle,
    setIsInclusive,
    setLanguage,
  } = useAddClassroom();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      allowLanguageToggle,
      isInclusive,
      language,
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const history = useHistory();

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
              EN
            </div>
          }
          title={intl.formatMessage({ id: "languageMode.engImmersionTitle" })}
          content={
            "Choose this setting if you want your class to learn all content and activities in the English language.  "
          }
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
          title={intl.formatMessage({ id: "languageMode.immersionTitle" })}
          content={
            "Choose this setting if you want your class to learn all content and activities in the Spanish language.  "
          }
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
                fontSize: "0.25rem",
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
          title={intl.formatMessage({ id: "languageMode.bilingualTitle" })}
          content={
            "Choose this setting if you want your class to learn Spanish with English supports and translations."
          }
          iconBackgroundColor="#006A67"
        />
      </div>
    ),
    value: "es.en",
  };

  const onSubmit = handleSubmit((responses) => {
    setAllowLanguageToggle(responses.allowLanguageToggle);
    setIsInclusive(responses.isInclusive);
    setLanguage(responses.language);
    history.push("/classrooms/add/students");
  });

  return (
    <div>
      <IonCard style={{ maxWidth: 580, margin: "auto", marginTop: "1.5rem" }}>
        <div style={{ width: "33%", margin: "auto" }}>
          <IonProgressBar color="primary" value={0.4} />
        </div>
        <form className="radio-button-select">
          <IonText className="ion-text-center">
            <h3 className="text-3xl semibold color-suelo">
              Classroom language settings
            </h3>
            <p className="text-lg color-barro">
              * You can always change this later
            </p>
          </IonText>
          <ExtendedRadio
            control={control}
            name="language"
            options={[billingualOption, spanishOption, englishOption]}
          />

          <IonItem lines="none">
            <Question
              id="language-toggle-popover-trigger"
              style={{ marginRight: "1rem" }}
            />
            <Toggle
              control={control}
              justify="space-between"
              label={
                <IonText>
                  <p className="text-2xl semibold">Language Toggle</p>
                </IonText>
              }
              mode="ios"
              name="allowLanguageToggle"
            />
            <Popover
              content={
                "Enable the Language Toggle button to allow your student to change the app language while they play. Disable to lock the app language."
              }
              trigger="language-toggle-popover-trigger"
            />
          </IonItem>

          <IonItem lines="none">
            <Question
              id="inclusive-spanish-popover-trigger"
              style={{ marginRight: "1rem" }}
            />
            <Toggle
              control={control}
              justify="space-between"
              label={
                <IonText>
                  <p className="text-2xl semibold">Inclusive Spanish</p>
                </IonText>
              }
              mode="ios"
              name="isInclusive"
            />
            <Popover
              content={
                "Choose inclusive Spanish to opt for terms like 'amigues,' 'niñes,' and 'Latine' to personalize your experience when referring to groups or non-binary characters. Disable this feature if you do not want to see these terms."
              }
              trigger="inclusive-spanish-popover-trigger"
            />
          </IonItem>

          <IonButton
            className="elevate"
            data-testid="language-select-continue-button"
            disabled={!isValid}
            shape="round"
            type="button"
            onClick={onSubmit}
          >
            <FormattedMessage id="common.continue" />
          </IonButton>
        </form>
      </IonCard>
    </div>
  );
};
