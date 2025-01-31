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
  onKeepGoingClick?: any;
  count: number;
}> = ({ onKeepGoingClick, count }) => {
  const {
    profile: { isImmersive },
    activeChildProfile,
  } = useProfile();
  const { language } = useLanguageToggle();
  const [showText, setShowText] = useState(true); // State to show/hide text
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

  const englishCongratsText: { [key: number]: string } = {
    5: "Congrats!",
    4: "Amazing!",
    3: "I know you could do it! Way to go!",
    2: "You're on the right track, keep going!",
    1: "Good effort! Keep trying!",
  };

  // Check if stars are valid and set fallback if necessary
  const safeStars = stars ?? 1;
  const percentageText = percentageRanges[safeStars];
  const congratsTextEn = englishCongratsText[safeStars];

  useEffect(() => {
    handleRecordAttempt(stopTimer());

    let newAudios: string[] = [];

    //TODO:implement later, when we have the audio files

    if (language === "es" || language === "esen") {
      newAudios.push();
    }
    if (language === "en" || language === "esen") {
      newAudios.push();
    }

    setAudios(newAudios);

    onended.pipe(first()).subscribe(() => {
      setAudioPlayed(true);
    });

    addAudio(newAudios);
  }, [count, language]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowText(false);
  //   }, 3000); // Set timeout to hide text after 3 seconds

  //   return () => clearTimeout(timeout);
  // }, []); // This effect runs only once

  return (
    <div className="padding-top-2">
      <DialogueScreen
        audios={audios}
        buttonI18nKey={"countWithMe.keepGoing"}
        characterImage={biliCharacter}
        onButtonClick={() => {
          if (onKeepGoingClick) {
            onKeepGoingClick();
          }
          startTimer();
        }}
      >
        <IonText class="ion-text-center">
          {language.startsWith("es") && (
            <>
              <h1 className="text-5xl color-suelo">
                <FormattedMessage id={`common.congrats.title.${stars}`} />
              </h1>
            </>
          )}
          {language === "en" && (
            <>
              <h1 className="text-5xl color-suelo">{congratsTextEn}</h1>
            </>
          )}
          {language === "esen" && (
            <>
              <h2 className="text-4xl color-english">{congratsTextEn}</h2>
            </>
          )}
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
