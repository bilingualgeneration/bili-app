// TODO: migrate DialogueScreenProps to replace primary/secondary with buttonI18nKey

import { useAudioManager } from "@/contexts/AudioManagerContext";
import { first } from "rxjs/operators";
import { I18nMessage } from "@/components/I18nMessage";
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
  buttonI18nKey?: string;
  buttonTextPrimary?: string;
  buttonTextSecondary?: string; // optional
  characterImage: string;
  onButtonClick: () => void;
}

export const DialogueScreen: React.FC<DialogueScreenProps> = ({
  audios,
  children,
  buttonI18nKey,
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
    <IonGrid style={{ height: "100vh", padding: 0 }}>
      <IonRow style={{ height: "100%" }}>
        <IonCol
          size="8"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
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
              {buttonTextPrimary && (
                <IonText>
                  <p className="semibold text-3xl">{buttonTextPrimary}</p>
                  {buttonTextSecondary && (
                    <p className="text-sm">{buttonTextSecondary}</p>
                  )}
                </IonText>
              )}
              {buttonI18nKey && (
                <IonText>
                  <p className="semibold text-3xl">
                    <I18nMessage id={buttonI18nKey} />
                  </p>
                  <I18nMessage
                    id={buttonI18nKey}
                    level={2}
                    wrapper={(t: string) => <p className="text-sm">{t}</p>}
                  />
                </IonText>
              )}
            </IonButton>
          </div>
        </IonCol>

        <IonCol
          size="4"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IonImg src={characterImage} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
