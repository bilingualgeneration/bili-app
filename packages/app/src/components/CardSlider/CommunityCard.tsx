import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { I18nMessage } from "../I18nMessage";
import LightbulbIcon from "@/assets/icons/lightbulb.svg";
import { AudioButton } from "@/components/AudioButton";
import { CloseButton } from "@/components/CloseButton";
//import "./CommunityCard.scss";

export interface CommunityCardProps {
  text_front: any[];
  text_back: any[]; // hint
  cardIndex: number; // for background color
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  text_front,
  text_back,
  cardIndex,
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];
  const color = colors[cardIndex % colors.length];

  return (
    /* card */
    <span className="card-wrapper">
      <IonCard className="card" style={{ backgroundColor: color }}>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol className="flex flex-column">
                <h1 className="text-2xl semibold color-suelo">
                  {text_front[0]?.text}
                </h1>
                {text_front[1] && (
                  <p className="text-lg color-english margin-top-1">
                    {text_front[1]?.text}
                  </p>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* if there's a hint, show the button */}
          {text_back.length > 0 && (
            <IonButton
              className="uva curved-corners"
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
              }}
              onClick={() => setShowHint(true)}
            >
              <IonIcon slot="icon-only" icon={LightbulbIcon} />
            </IonButton>
          )}
        </IonCardContent>
      </IonCard>

      {/* hint modal */}
      <IonModal
        className="modal"
        isOpen={showHint}
        onWillDismiss={() => setShowHint(false)}
      >
        <div className="ion-padding modal-content margin-top-1">
          {/* close button */}
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
            }}
          >
            <CloseButton onClick={() => setShowHint(false)} />
          </div>
          <IonGrid>
            <IonRow className="margin-bottom-2 align-items-center">
              {/* hint icon (top left) */}
              <IonCol
                size="1"
                className="ion-text-center margin-left-1 margin-right-1"
              >
                <IonButton className="uva curved-corners elevate">
                  <IonIcon slot="icon-only" icon={LightbulbIcon} />
                </IonButton>
              </IonCol>
              {/* hint title */}
              <IonCol size="10">
                <IonText>
                  <h2 className="text-4xl semibold">
                    <I18nMessage id="common.hint" />
                  </h2>
                  <I18nMessage
                    id="common.hint"
                    level={2}
                    wrapper={(text: string) => (
                      <p className="text-3xl color-base">{text}</p>
                    )}
                  />
                </IonText>
              </IonCol>
            </IonRow>

            {/* hint lines */}
            {text_back.map((hintLine, idx) => (
              <IonRow className="margin-top-1">
                {/* audio */}
                <IonCol size="1" className="margin-left-1 margin-right-1">
                  {hintLine.audio?.url && (
                    <AudioButton
                      audio={{ en: hintLine.audio.url }}
                      className="elevate"
                      size="small"
                    />
                  )}
                </IonCol>
                {/* hint text */}
                <IonCol size="10">
                  <IonText>
                    <p className="text-2xl color-suelo">{text_back[0]?.text}</p>
                    {text_back[1] && (
                      <p className="text-xl color-english">
                        {text_back[1]?.text}
                      </p>
                    )}
                  </IonText>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </div>
      </IonModal>
    </span>
  );
};
