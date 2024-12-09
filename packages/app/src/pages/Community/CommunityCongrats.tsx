import { DialogueScreen } from "@/components/DialogueScreen";
import { I18nMessage } from "@/components/I18nMessage";
import { useActivity } from "@/contexts/ActivityContext";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { first } from "rxjs";
import biliCharacter from "@/assets/img/bili_in_coat.png";
import HeartImage from "@/assets/icons/heart_congrats.svg";

export const CommunityCongrats: React.FC<{
  onKeepGoingClick?: any;
  count: number;
}> = ({ onKeepGoingClick, count }) => {
  const {
    profile: { isImmersive },
    activeChildProfile,
  } = useProfile();
  const { language } = useLanguage();
  const [showText, setShowText] = useState(true); // State to show/hide text
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, onended } = useAudioManager();
  const [audios, setAudios] = useState<string[]>([]);
  const { startTimer, stopTimer } = useTimeTracker();

  // Check if stars are valid and set fallback if necessary

  const button_es = "¡Sigue adelante!";
  const button_en = "Keep going!";

  return (
    <div className="padding-top-2">
      <DialogueScreen
        audios={audios}
        buttonTextPrimary={language === "en" ? button_en : button_es}
        buttonTextSecondary={
          language === "es.en" || language === "en.es" ? button_en : ""
        }
        characterImage={biliCharacter}
        onButtonClick={() => {
          if (onKeepGoingClick) {
            onKeepGoingClick();
          }
        }}
      >
        <IonText class="ion-text-center">
          <div className="stars-container">
            <img src={HeartImage} alt="flower" className="star-image" />
          </div>
          <h1 className="text-5xl color-suelo">
            <I18nMessage id="common.congrats.flower" />
          </h1>
          <I18nMessage
            id="common.congrats.flower"
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-4xl color-grey">{text}</h2>
            )}
          />
        </IonText>
      </DialogueScreen>
    </div>
  );
};
