import classnames from "classnames";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonText,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { starSharp } from "ionicons/icons";
import { Link } from "react-router-dom";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useRef, useState } from "react";
import { useLanguageToggle } from "@/components//LanguageToggle";
import { useProfile } from "@/hooks/Profile";
import SpeakerIcon from "@/assets/icons/speaker.svg";

import Avatar from "@/assets/icons/avatar.png";
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";

interface AudioButtonProps {
  audio: {
    en: { url: string | undefined };
    es: { url: string | undefined };
  };
  className?: string;
  size?: "default" | "small" | "large" | undefined;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  audio,
  className,
  size = "default",
}) => {
  const { addAudio, clearAudio } = useAudioManager();
  const { language } = useLanguageToggle();
  return (
    <IonButton
      className={classnames("flamenco-high", "curved-corners", className)}
      size={size}
      onClick={() => {
        let audios = [];
        switch (language) {
          case "en":
            audios.push(audio.en.url);
            break;
          case "es":
            audios.push(audio.es.url);
            break;
          case "esen":
            audios.push(audio.es.url);
            audios.push(audio.en.url);
            break;
          default:
            break;
        }
        addAudio(audios);
      }}
    >
      <IonIcon slot="icon-only" icon={SpeakerIcon} />
    </IonButton>
  );
};
