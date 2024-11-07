import biliCharacter from "@/assets/img/bili_in_coat.png";
import React, { useState, useEffect } from "react";
import { first } from "rxjs/operators";
import { FormattedMessage } from "react-intl";
import { getFunctions, httpsCallable } from "firebase/functions";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useActivity } from "@/contexts/ActivityContext";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { DialogueScreen } from "@/components/DialogueScreen";
import "./Intruder.scss";
import "../StoryFactory/StoryFactory.scss";
import { useHistory } from "react-router";
import StarImage from "@/assets/icons/small-star.svg";

/*
import audio_5_en from "@/assets/audio/IntruderAudio/intruder_congrats_5_en.mp3";
import audio_10_en from "@/assets/audio/IntruderAudio/intruder_congrats_10_en.mp3";
import audio_20_en from "@/assets/audio/IntruderAudio/intruder_congrats_20_en.mp3";
import audio_all_en from "@/assets/audio/IntruderAudio/intruder_congrats_all_en.mp3";
import audio_5_es from "@/assets/audio/IntruderAudio/intruder_congrats_5_es.mp3";
import audio_10_es from "@/assets/audio/IntruderAudio/intruder_congrats_10_es.mp3";
import audio_20_es from "@/assets/audio/IntruderAudio/intruder_congrats_20_es.mp3";
import audio_all_es from "@/assets/audio/IntruderAudio/intruder_congrats_all_es.mp3";

const sounds: any = {
  en: {
    "5": audio_5_en,
    "10": audio_10_en,
    "20": audio_20_en,
    all: audio_all_en,
  },
  es: {
    "5": audio_5_es,
    "10": audio_10_es,
    "20": audio_20_es,
    all: audio_all_es,
  },
};
*/

export const IntruderCongrats: React.FC<{
  setShowCongrats: any;
  count: number; // note: when pack is done, count = -1
}> = ({ setShowCongrats, count }) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { language } = useLanguageToggle();
  const { handleRecordAttempt, stars } = useActivity();
  const { startTimer, stopTimer } = useTimeTracker();
  const { addAudio, clearAudio, onended } = useAudioManager();
  const history = useHistory();
  const [audios, setAudios] = useState<string[]>([]);

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

  const button_es = "¡Sigue adelante!";
  const button_en = "Keep going!";

  return (
    <div className="padding-top-2">
      <DialogueScreen
        audios={audios}
        buttonTextPrimary={language === "en" ? button_en : button_es}
        buttonTextSecondary={language === "esen" ? button_en : ""}
        characterImage={biliCharacter}
        onButtonClick={() => {
          startTimer();
          setShowCongrats(false);
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
