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

export const StoryFactoryCongrats: React.FC = () => {
  const {
    profile: { isImmersive },
  } = useProfile();
  const [audios, setAudios] = useState<string[]>([]);
  const { handleRecordAttempt, stars } = useActivity();
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
  }, [language]);

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
          history.push("/story-factory-game/select");
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
