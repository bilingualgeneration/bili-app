import biliCharacter from "@/assets/img/bili_in_coat.png";

import React, { useState, useEffect } from "react";
import { first } from "rxjs/operators";
import { FormattedMessage } from "react-intl";
import { getFunctions, httpsCallable } from "firebase/functions";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useActivity } from "@/contexts/ActivityContext";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { DialogueScreen } from "@/components/DialogueScreen";
import "./Intruder.scss";
import "../StoryFactory/StoryFactory.scss";
import { useHistory } from "react-router";
import { useLanguage } from "@/hooks/Language";
import { useI18n } from "@/hooks/I18n";
import { I18nMessage } from "@/components/I18nMessage";

import StarImage from "@/assets/icons/small-star.svg";

export const IntruderCongrats: React.FC<{
  setShowCongrats: any;
  count: number; // note: when pack is done, count = -1
}> = ({ setShowCongrats, count }) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { language } = useLanguage();
  const { handleRecordAttempt, stars } = useActivity();
  const { startTimer, stopTimer } = useTimeTracker();
  const { addAudio, clearAudio, onended } = useAudioManager();
  const [audios, setAudios] = useState<string[]>([]);
  const { getText } = useI18n();

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

  return (
    <div className="responsive-height-with-header">
      <DialogueScreen
        audios={audios}
        buttonI18nKey={"intruder.keepGoing"}
        characterImage={biliCharacter}
        onButtonClick={() => {
          startTimer();
          setShowCongrats(false);
        }}
      >
        <IonText class="ion-text-center">
          <h1 className="text-5xl color-suelo">
            <I18nMessage id={`common.congrats.title.${stars}`} />
          </h1>

          <I18nMessage
            id={`common.congrats.title.${stars}`}
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
