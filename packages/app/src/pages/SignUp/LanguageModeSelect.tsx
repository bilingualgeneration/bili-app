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
import { useSwiper } from "swiper/react";
import { useIntl, FormattedMessage } from "react-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpData } from "@/pages/SignUp/SignUpContext";
import { useForm } from "react-hook-form";
import { RadioCard } from "../../components/RadioCard";
import { ExtendedRadioOption, ExtendedRadio } from "@/components/ExtendedRadio";

export type LanguageModeSelectProps = {
  teacherSlide: number;
  parentSlide: number;
};

export const LanguageModeSelect: React.FC<LanguageModeSelectProps> = ({
  teacherSlide,
  parentSlide,
}) => {
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
  const { data, setData } = useSignUpData();
  const swiper = useSwiper();

  const spanishOption: ExtendedRadioOption = {
    component: (
      <div>
        <RadioCard
          icon={
            <div
              style={{
                color: "#8B1A00",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "120%",
                letterSpacing: "0.2px",
              }}
            >
              EN
            </div>
          }
          title={intl.formatMessage({
            id: "languageMode.immersionTitle",
            defaultMessage: "Spanish immersion",
            description: "Title of the Spanish immersion mode option",
          })}
          content={intl.formatMessage({
            id: "languageMode.immersion",
            defaultMessage:
              "Choose this setting if you want your child to learn all content and activities in the Spanish language.",
            description: "Description of the Spanish immersion option",
          })}
          iconBackgroundColor="var(--Habanero-High)"
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
                color: "rgba(0, 0, 0, 0.56)",
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
          iconBackgroundColor="var(--Sol-Low)"
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
      swiper.slideTo(teacherSlide);
    }
    // @ts-ignore todo: better typing
    if (data.role === "parent") {
      swiper.slideTo(parentSlide);
    }
  });

  return (
    <>
      <form className="radio-button-select">
        <IonText className="ion-text-center">
          <h1>
            <FormattedMessage
              id="languageMode.settings"
              defaultMessage="Choose your settings"
              description="User can choose if they want bilingual settings or English assisted settings"
            />
          </h1>
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
            id="languageMode.continue"
            defaultMessage="Continue"
            description="Continue button after user chooses language mode"
          />
        </IonButton>
      </form>
    </>
  );
};
