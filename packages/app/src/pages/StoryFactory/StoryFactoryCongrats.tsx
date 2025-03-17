import biliCharacter from "@/assets/icons/bili_character.svg";
import React, { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/hooks/Profile";
import { useActivity } from "@/contexts/ActivityContext";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { DialogueScreen } from "@/components/DialogueScreen";
import StarImage from "@/assets/icons/small-star.svg";
import "./StoryFactory.scss";
import { first } from "rxjs";
import { useHistory } from "react-router";
import { I18nMessage } from "@/components/I18nMessage";

export const StoryFactoryCongrats: React.FC<{
  setShowCongrats: any;
}> = ({ setShowCongrats }) => {
  const {
    profile: { isImmersive },
  } = useProfile();
  const [audios, setAudios] = useState<string[]>([]);
  //const { handleRecordAttempt, stars } = useActivity();
  const { startTimer, stopTimer } = useTimeTracker();
  const { language } = useLanguageToggle();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, onended } = useAudioManager();
  const history = useHistory();

  const percentageRanges: { [key: number]: string } = {
    5: "90-100%",
    4: "75-89%",
    3: "50-74%",
    2: "25-49%",
    1: "0-24%",
  };

  // Check if stars are valid and set fallback if necessary
  const safeStars = 1;
  const percentageText = percentageRanges[safeStars];

  {
    /* Commented out until ActivityContext is implemented */
  }
  // useEffect(() => {
  //   handleRecordAttempt(stopTimer());

  //   let newAudios: string[] = [];

  //   //TODO:implement later, when we have the audio files

  //   if (language === "es" || language === "es.en") {
  //     newAudios.push();
  //   }
  //   if (language === "en" || language === "es.en") {
  //     newAudios.push();
  //   }

  //   setAudios(newAudios);

  //   onended.pipe(first()).subscribe(() => {
  //     setAudioPlayed(true);
  //   });

  //   addAudio(newAudios);
  // }, [language]);

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
          {/* <h1 className="text-6xl color-suelo">{percentageText}</h1> */}
        </IonText>
      </DialogueScreen>
    </div>
  );
};
