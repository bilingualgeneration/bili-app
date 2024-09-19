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
    language: z.string(), //z.enum(['en', 'es', 'esen']),
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
            id: "languageMode.engImmersionTitle",
            defaultMessage: "English Immersion",
          })}
          content={intl.formatMessage({
            id: "languageMode.engImmersion",
            defaultMessage:
              "Choose this setting if you want your child to learn all content and activities in the English language.",
          })}
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
          iconBackgroundColor="#006A67"
        />
      </div>
    ),
    value: "esen",
  };

  const onSubmit = handleSubmit((responses) => {
    setAllowLanguageToggle(responses.allowLanguageToggle);
    setIsInclusive(responses.isInclusive);
    setLanguage(responses.language);
    history.push("/classrooms/add/students");
  });

  return (
    <div className="">
      <IonCard style={{ maxWidth: 580, margin: "auto", marginTop: "24px" }}>
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
            defaultOption={{
              component: <div />,
              value: language,
            }}
            name="language"
            options={[billingualOption, spanishOption, englishOption]}
          />

          <IonItem lines="none">
            <Question
              id="language-toggle-popover-trigger"
              style={{ marginRight: "16px" }}
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
              content={"???"}
              trigger="language-toggle-popover-trigger"
            />
          </IonItem>

          <IonItem lines="none">
            <Question
              id="inclusive-spanish-popover-trigger"
              style={{ marginRight: "16px" }}
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
      </IonCard>
    </div>
  );
};
