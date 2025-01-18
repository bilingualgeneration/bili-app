import { ExtendedRadio, ExtendedRadioOption } from "@/components/ExtendedRadio";
import { I18nMessage } from "@/components/I18nMessage";
import { RadioCard } from "@/components/RadioCard";
import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import HappyBilli from "@/assets/icons/bili_happy.svg";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useCardSlider } from "@/contexts/CardSlider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { useI18n } from "@/hooks/I18n";
import { useLanguage } from "@/hooks/Language";

import audio_no_en from "@/assets/audio/FlowerCongrats/no_en.mp3";
import audio_yes_en from "@/assets/audio/FlowerCongrats/yes.mp3";
import audio_no_es from "@/assets/audio/FlowerCongrats/no_es.mp3";
import audio_yes_es from "@/assets/audio/FlowerCongrats/sí.mp3";
import audio_idk_en from "@/assets/audio/FlowerCongrats/idk.mp3";
import audio_idk_es from "@/assets/audio/FlowerCongrats/no_lo_sé.mp3";
import audio_en from "@/assets/audio/FlowerCongrats/what_do_you_think.mp3";
import audio_es from "@/assets/audio/FlowerCongrats/qué_opinas.mp3";

//import "./Community.scss";

const audios: Record<string, Record<string, string>> = {
  yes: {
    en: audio_yes_en,
    es: audio_yes_es,
  },
  no: {
    en: audio_no_en,
    es: audio_no_es,
  },
  other: {
    en: audio_idk_en,
    es: audio_idk_es,
  },
};

export const OpinionFeedback: React.FC = () => {
  const { activity } = useCardSlider();
  const { language } = useLanguage();
  const history = useHistory();
  const { getText } = useI18n();
  const { addAudio, clearAudio } = useAudioManager();
  const { populateText } = useLanguage();
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm();

  let headerAudios: any[] = [];
  switch (language) {
    case "es":
      headerAudios = [audio_es];
      break;
    case "en":
      headerAudios = [audio_en];
      break;
    case "es.en":
      headerAudios = [audio_es, audio_en];
      break;
    case "en.es":
      headerAudios = [audio_en, audio_es];
      break;
  }

  useEffect(() => {
    addAudio(headerAudios);
    return () => {
      clearAudio();
    };
  }, []);

  const yesOption: ExtendedRadioOption = {
    component: (
      <IonCol size="4">
        <RadioCard
          title={getText("common.yes", 1, "authed")}
          subTitle={getText("common.yes", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFF"
          maxHeight="5.25rem"
          onAudioPlay={() => {
            const audio: string[] = language
              .split(".")
              .map((l: string) => audios["yes"][l]);
            addAudio(audio);
          }}
        />
      </IonCol>
    ),
    value: "yes",
  };

  const noOption: ExtendedRadioOption = {
    component: (
      <IonCol size="4">
        <RadioCard
          title={getText("common.no", 1, "authed")}
          subTitle={getText("common.no", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFF"
          maxHeight="5.25rem"
          onAudioPlay={() => {
            // @ts-ignore
            const audio: string[] = language
              .split(".")
              .map((l: string) => audios["no"][l]);
            addAudio(audio);
          }}
        />
      </IonCol>
    ),
    value: "no",
  };
  const otherOption: ExtendedRadioOption = {
    component: (
      <IonCol size="4">
        <RadioCard
          title={getText("common.dontKnow")}
          subTitle={getText("common.dontKnow", 2)}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFF"
          maxHeight="5.25rem"
          onAudioPlay={() => {
            // @ts-ignore
            const audio: string[] = language
              .split(".")
              .map((l: string) => audios["other"][l]);
            addAudio(audio);
          }}
        />
      </IonCol>
    ),
    value: "other",
  };

  const onSubmit = handleSubmit((data) => {
    history.push(`/${activity}/congrats`);
  });

  return (
    <div className="responsive-height-with-header flex ion-justify-content-center ion-align-items-center">
      <IonGrid>
        <IonRow>
          <IonCol className="ion-hide-lg-down" size-lg="1"></IonCol>
          <IonCol>
            <IonCard
              style={{ textAlign: "center" }}
              className="thoughts-questions-card drop-shadow"
            >
              <form action="">
                <IonText className="ion-text-start">
                  <h2 className="text-3xl semibold color-suelo padding-left-2">
                    <I18nMessage id="common.whatYouThink" />
                  </h2>
                  <I18nMessage
                    id="common.whatYouThink"
                    level={2}
                    wrapper={(text: string) => (
                      <p className="text-3xl color-grey padding-left-2">
                        {text}
                      </p>
                    )}
                  />
                </IonText>
                <IonCard
                  style={{ background: "#D6D3F0" }}
                  className="padding-vertical-3 margin-left-2 margin-right-2"
                >
                  <IonText>
                    <h1 className="text-3xl semibold color-suelo">
                      {language === "en"
                        ? "I like going to school every day."
                        : "Me gusta ir a la escuela todos los días."}
                    </h1>
                    {(language === "es.en" || language === "en.es") && (
                      <p className="text-2xl color-grey">
                        {"Me gusta ir a la escuela todos los días."}
                      </p>
                    )}
                  </IonText>
                </IonCard>
                <ExtendedRadio
                  control={control}
                  name="feelingsFeedback"
                  displayCardsInRow={true}
                  isMaxWidthNeeded={false}
                  maxWidth="25rem"
                  options={[yesOption, noOption, otherOption]}
                />
                <IonButton
                  data-testid="addclassroom-notification-method-continue-button"
                  disabled={!isValid}
                  shape="round"
                  type="button"
                  onClick={onSubmit}
                >
                  <IonText className=" padding-right-5 padding-left-5">
                    <h2 className="text-3xl semibold color-base">
                      <I18nMessage id="common.next" />
                    </h2>

                    <I18nMessage
                      id="common.next"
                      level={2}
                      wrapper={(text: string) => (
                        <p className="text-sm color-base">{text}</p>
                      )}
                    />
                  </IonText>
                </IonButton>
              </form>
            </IonCard>
          </IonCol>
          <IonCol className="ion-hide-lg-down" size-lg="1"></IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
function addAudio(arg0: never[]) {
  throw new Error("Function not implemented.");
}

function clearAudio() {
  throw new Error("Function not implemented.");
}
