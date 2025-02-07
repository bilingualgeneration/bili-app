import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useProfile } from "@/hooks/Profile";
import { FormattedMessage } from "react-intl";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useHistory } from "react-router-dom";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useActivity } from "@/contexts/ActivityContext";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { first } from "rxjs/operators";

// audio
import count_congrats_en_3 from "@/assets/audio/CountAudio/count_congrats_en_3.mp3";
import count_congrats_en_6 from "@/assets/audio/CountAudio/count_congrats_en_6.mp3";
import count_congrats_en_9 from "@/assets/audio/CountAudio/count_congrats_en_9.mp3";
import count_congrats_en_13 from "@/assets/audio/CountAudio/count_congrats_en_13.mp3";
import count_congrats_es_3 from "@/assets/audio/CountAudio/count_congrats_es_3.mp3";
import count_congrats_es_6 from "@/assets/audio/CountAudio/count_congrats_es_6.mp3";
import count_congrats_es_9 from "@/assets/audio/CountAudio/count_congrats_es_9.mp3";
import count_congrats_es_13 from "@/assets/audio/CountAudio/count_congrats_es_13.mp3";
import activity_completed_en from "@/assets/audio/CountAudio/activity_completed_en.mp3";
import activity_completed_es from "@/assets/audio/CountAudio/activity_completed_es.mp3";
import "./CountWithMe.scss";
import { DialogueScreen } from "@/components/DialogueScreen";
// svgs
import StarImage from "@/assets/icons/small-star.svg";
import biliCharacter from "@/assets/img/bili_in_coat.png";
import { I18nMessage } from "@/components/I18nMessage";
import { useLanguage } from "@/hooks/Language";

const sounds: any = {
  en: {
    "3": count_congrats_en_3,
    "6": count_congrats_en_6,
    "9": count_congrats_en_9,
    "13": count_congrats_en_13,
  },
  es: {
    "3": count_congrats_es_3,
    "6": count_congrats_es_6,
    "9": count_congrats_es_9,
    "13": count_congrats_es_13,
  },
};

export const CountWithMeCongrats: React.FC<{
  onContinue: () => void;
  count: number;
}> = ({ onContinue, count }) => {
  const {
    profile: { isImmersive },
    activeChildProfile,
  } = useProfile();
  const { language } = useLanguage();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, onended } = useAudioManager();
  const [audios, setAudios] = useState<string[]>([]);
  const { handleRecordAttempt, stars } = useActivity();
  const { startTimer, stopTimer } = useTimeTracker();

  // can potentially uncomment once 'congrats after x animals' screen is built

  // useEffect(() => {
  //   onended.pipe(first()).subscribe(() => {
  //     setAudioPlayed(true);
  //   });

  //   if (language === 'esen') {
  //     if (isInclusive) {
  //       addAudio([audio_es]);
  //     } else {
  //       addAudio([audio_en]);
  //     }
  //   } else {
  //     addAudio([audio_en]);
  //   }
  //   return () => {
  //     clearAudio();
  //   };
  // }, []);

  const percentageRanges: { [key: number]: string } = {
    5: "90-100%",
    4: "75-89%",
    3: "50-74%",
    2: "25-49%",
    1: "0-24%",
  };

  // Check if stars are valid and set fallback if necessary
  const safeStars = stars ?? 1;
  const percentageText = percentageRanges[safeStars];

  useEffect(() => {
    handleRecordAttempt(stopTimer());

    let newAudios: string[] = [];

    //TODO:implement later, when we have the audio files

    if (language === "es" || language === "es.en") {
      newAudios.push();
    }
    if (language === "en" || language === "es.en") {
      newAudios.push();
    }

    setAudios(newAudios);

    onended.pipe(first()).subscribe(() => {
      setAudioPlayed(true);
    });

    addAudio(newAudios);
  }, [count, language]);

  return (
    <div className="padding-top-2">
      <DialogueScreen
        audios={audios}
        buttonI18nKey={"countWithMe.keepGoing"}
        characterImage={biliCharacter}
        onButtonClick={() => {
          startTimer();
          onContinue();
        }}
      >
        <IonText class="ion-text-center">
          <h1 className="text-5xl color-suelo">
            <I18nMessage id={`common.congrats.title.${safeStars}`} />
          </h1>

          <I18nMessage
            id={`common.congrats.title.${safeStars}`}
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-4xl color-english">{text}</h2>
            )}
          />

          <div className="stars-container">
            {[...Array(safeStars)].map((_, index) => (
              <img
                key={index}
                src={StarImage}
                alt="star"
                className="star-image"
              />
            ))}
          </div>
          <h1 className="text-6xl color-suelo">{percentageText}</h1>
        </IonText>
      </DialogueScreen>
    </div>
  );
};
