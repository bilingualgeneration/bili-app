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
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { useI18n } from "@/hooks/I18n";
import { useLanguage } from "@/hooks/Language";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useEffect } from "react";
import audio_happy_en from "@/assets/audio/FlowerCongrats/happy.mp3";
import audio_happy_es from "@/assets/audio/FlowerCongrats/feliz.mp3";
import audio_calm_en from "@/assets/audio/FlowerCongrats/calm.mp3";
import audio_calm_es from "@/assets/audio/FlowerCongrats/tranquile.mp3";
import audio_sad_en from "@/assets/audio/FlowerCongrats/sad.mp3";
import audio_sad_es from "@/assets/audio/FlowerCongrats/triste.mp3";
import audio_terrible_en from "@/assets/audio/FlowerCongrats/terrible.mp3";
import audio_terrible_es from "@/assets/audio/FlowerCongrats/fatal.mp3";
import audio_other_en from "@/assets/audio/FlowerCongrats/other.mp3";
import audio_other_es from "@/assets/audio/FlowerCongrats/otro.mp3";
import audio_en from "@/assets/audio/FlowerCongrats/how_do_you_feel.mp3";
import audio_es from "@/assets/audio/FlowerCongrats/cómo_te_sientes.mp3";

const audios: Record<string, Record<string, string>> = {
  happy: {
    en: audio_happy_en,
    es: audio_happy_es,
  },
  calm: {
    en: audio_calm_en,
    es: audio_calm_es,
  },
  sad: {
    en: audio_sad_en,
    es: audio_sad_es,
  },
  terrible: {
    en: audio_terrible_en,
    es: audio_terrible_es,
  },
  other: {
    en: audio_other_en,
    es: audio_other_es,
  },
};

export const FeelingsFeedback: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{
    returnTo?: string;
    cardIndex?: number;
    uniqueClicks?: number;
  }>(); // Access the state
  const { language } = useLanguage();
  const { getText } = useI18n();
  const { populateText } = useLanguage();
  const { addAudio, clearAudio } = useAudioManager();

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

  const happyOption: ExtendedRadioOption = {
    component: (
      <IonCol size="2.3" className="ion-no-padding">
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={getText("common.feeling.happy", 1, "authed")}
          subTitle={getText("common.feeling.happy", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          titleFontSize="xl"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FFE24F"
          maxHeight="17.5rem"
          onAudioPlay={() => {
            const audio: string[] = language
              .split(".")
              .map((l: string) => audios["happy"][l]);
            addAudio(audio);
          }}
        />
      </IonCol>
    ),
    value: "happy",
  };

  const calmOption: ExtendedRadioOption = {
    component: (
      <IonCol size="2.3" className="ion-no-padding">
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={getText("common.feeling.calm", 1, "authed")}
          subTitle={getText("common.feeling.calm", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          titleFontSize="xl"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#C3ECE2"
          maxHeight="17.5rem"
          onAudioPlay={() => {
            const audio: string[] = language
              .split(".")
              .map((l: string) => audios["calm"][l]);
            addAudio(audio);
          }}
        />
      </IonCol>
    ),
    value: "calm",
  };
  const sadOption: ExtendedRadioOption = {
    component: (
      <IonCol size="2.3" className="ion-no-padding">
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={getText("common.feeling.sad", 1, "authed")}
          subTitle={getText("common.feeling.sad", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          titleFontSize="xl"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#8FB8FA"
          maxHeight="17.5rem"
          onAudioPlay={() => {
            const audio: string[] = language
              .split(".")
              .map((l: string) => audios["sad"][l]);
            addAudio(audio);
          }}
        />
      </IonCol>
    ),
    value: "sad",
  };
  const terribleOption: ExtendedRadioOption = {
    component: (
      <IonCol size="2.3" className="ion-no-padding">
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={getText("common.feeling.terrible", 1, "authed")}
          subTitle={getText("common.feeling.terrible", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          titleFontSize="xl"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#FF8B70"
          maxHeight="17.2rem"
          onAudioPlay={() => {
            const audio: string[] = language
              .split(".")
              .map((l: string) => audios["terrible"][l]);
            addAudio(audio);
          }}
        />
      </IonCol>
    ),
    value: "terrible",
  };
  const otherOption: ExtendedRadioOption = {
    component: (
      <IonCol size="2.3" className="ion-no-padding">
        <RadioCard
          icon={
            <div>
              <img src={HappyBilli} alt="Happy Billi" style={{}} />
            </div>
          }
          title={getText("common.feeling.other", 1, "authed")}
          subTitle={getText("common.feeling.other", 2, "authed")}
          titleColor="color-suelo"
          subTitleColor="color-grey"
          titleFontSize="xl"
          subTitleFontSize="lg"
          iconBackgroundColor="transparent"
          flexDirectionColumn={true}
          isJustPicture={true}
          isTextCentered={true}
          backgroundColor="#F28AC9"
          maxHeight="17.5rem"
          onAudioPlay={() => {
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
    history.push("/community/congrats", {
      ...location.state,
    });
  });

  return (
    <div className="responsive-height-with-header flex ion-justify-content-center ion-align-items-center">
      <IonGrid>
        <IonRow>
          <IonCol className="ion-hide-lg-down" size-lg="1"></IonCol>
          <IonCol>
            <IonCard className="drop-shadow" style={{ textAlign: "center" }}>
              <form action="">
                <IonText className="ion-text-start">
                  <h2 className="text-3xl semibold color-suelo padding-left-2">
                    <I18nMessage id="common.howYouFeel" />
                  </h2>
                  <I18nMessage
                    id="common.howYouFeel"
                    level={2}
                    wrapper={(text: string) => (
                      <p className="text-3xl color-grey padding-left-2">
                        {text}
                      </p>
                    )}
                  />
                </IonText>
                <ExtendedRadio
                  control={control}
                  name="feelingsFeedback"
                  displayCardsInRow={true}
                  isMaxWidthNeeded={true}
                  maxWidth="14.5rem"
                  options={[
                    happyOption,
                    calmOption,
                    sadOption,
                    terribleOption,
                    otherOption,
                  ]}
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
function getText(
  arg0: string,
  arg1: number,
  arg2: string,
): string | import("react-intl").MessageFormatElement[] {
  throw new Error("Function not implemented.");
}
