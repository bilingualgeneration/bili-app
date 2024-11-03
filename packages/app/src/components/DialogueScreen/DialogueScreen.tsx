import { useAudioManager } from "@/contexts/AudioManagerContext";
import { first } from "rxjs/operators";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonButton,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";

import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png"; // TODO: rename file

interface DialogueScreenProps {
  audios: string[];
  children: React.ReactNode;
  buttonTextPrimary: string;
  buttonTextSecondary?: string; // optional
  characterImage: string;
  onButtonClick: () => void;
}

export const DialogueScreen: React.FC<DialogueScreenProps> = ({
  audios,
  children,
  buttonTextPrimary,
  buttonTextSecondary,
  characterImage,
  onButtonClick,
}) => {
  const [hasAudioPlayed, setHasAudioPlayed] = useState(false);
  const { addAudio, clearAudio, onended } = useAudioManager();
  useEffect(() => {
    addAudio(audios);
    onended.pipe(first()).subscribe(() => {
      setHasAudioPlayed(true);
    });
    return () => {
      clearAudio();
    };
  }, []);
  return (
    <div
      className="margin-top-2 margin-left-5"
      style={{
        background: `url(${characterImage}) no-repeat`,
        backgroundPosition: "right 5rem top 2rem",
        backgroundSize: "350px auto",
        height: `calc(100vh - 120px - 2rem)`,
        marginBottom: -150,
      }}
    >
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <IonCard className="drop-shadow">
              <IonCardContent>{children}</IonCardContent>
            </IonCard>
            <div className="margin-top-4" style={{ position: "relative" }}>
              {hasAudioPlayed && (
                <img
                  src={StoryFactoryArrow}
                  alt="indicator arrow to next button"
                  style={{
                    left: 0,
                    top: 12,
                    position: "absolute",
                  }}
                />
              )}
              <IonButton
                expand="block"
                shape="round"
                onClick={onButtonClick}
                style={{ width: "50%", margin: "auto" }}
              >
                <IonText>
                  <p className="semibold text-3xl">{buttonTextPrimary}</p>
                  {buttonTextSecondary && (
                    <p className="text-sm">{buttonTextSecondary}</p>
                  )}
                </IonText>
              </IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
