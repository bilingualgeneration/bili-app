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
import { useLanguage } from "@/hooks/Language";
import SpeakerIcon from "@/assets/icons/speaker.svg";

import Avatar from "@/assets/icons/avatar.png";
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";

interface AudioButtonProps {
  audio: {
    en?: string | any;
    es?: string | any;
    "es-inc"?: string | any;
  };
  className?: string;
  size?: "default" | "small" | "large" | undefined;
  onClick?: () => void;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  audio,
  className,
  size = "default",
  onClick,
}) => {
  const { addAudio, clearAudio } = useAudioManager();
  const { language } = useLanguage();
  return (
    <IonButton
      className={classnames("flamenco-high", "curved-corners", className)}
      size={size}
      onClick={() => {
        // @ts-ignore
        let audios: string[] = language.split(".").map((l: string) => audio[l]);
        addAudio(audios);

        if (onClick) onClick();
      }}
    >
      <IonIcon slot="icon-only" icon={SpeakerIcon} />
    </IonButton>
  );
};
