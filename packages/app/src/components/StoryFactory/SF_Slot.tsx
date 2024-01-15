import React, { useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { volumeMedium } from "ionicons/icons";
import { VolumeCard } from "@/components/StoryFactory/VolumeCard";
import polygonUp from "@/assets/icons/polygon_up.svg";
import polygonDown from "@/assets/icons/polygon_down.svg";
import { FormattedMessage } from "react-intl";
import "../../pages/StoryFactory/StoryFactory.css";

import { useProfile } from "@/contexts/ProfileContext";

interface FabricaCardProps {
  es: string;
  en: string;
  wordIndices: number[];
  setWordIndices: any;
  index: number;
  position: number;
}

const speak = (normalized_key: string, lang: string) => {
  const path: string = `/assets/audio/${normalized_key}_${lang}.mp3`;
  console.log(path);
  const audio = new Audio(path);
  audio.play();
  /*
      const msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.lang = lang;
      window.speechSynthesis.speak(msg);
      */
};

const normalize = (s: string): string => {
  return s.toLowerCase().replace(/\s+/g, "_").replace(/\./g, "");
};

export const FabricaCard: React.FC<FabricaCardProps> = ({
  es,
  en,
  wordIndices,
  setWordIndices,
  index,
  position,
}) => {
  const { isImmersive } = useProfile();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonGrid class="ion-no-padding">
          <IonRow>
            <IonCol class="ion-text-center">
              <div className="polygon-up">
                <img
                  src={polygonUp}
                  alt="arrow shape pointing upwards"
                  onClick={() => {
                    let copy = [...wordIndices];
                    if (index === 3) {
                      copy[position] = 0;
                    } else {
                      copy[position] = index + 1;
                    }
                    setWordIndices(copy);
                  }}
                />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCard className="mini-fabrica-card">
          <IonCardContent>
            <IonGrid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IonRow class="ion-justify-content-center">
                  <IonCol class="ion-text-center">
                    <span
                      onClick={() => {
                        speak(normalize(en), "es");
                      }}
                    >
                      <VolumeCard />
                    </span>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonText>
                    <p className="fabrica-text1-spanish">{es}</p>
                    {!isImmersive && (
                      <p className="fabrica-text2-english">{en}</p>
                    )}
                  </IonText>
                </IonRow>
                {!isImmersive && (
                  <IonRow class="ion-justify-content-center">
                    <IonCol class="ion-text-center">
                      <span
                        onClick={() => {
                          speak(normalize(en), "en");
                        }}
                      >
                        <VolumeCard iconClass="volume-icon-container-greyed-out" />
                      </span>
                    </IonCol>
                  </IonRow>
                )}
              </div>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonGrid class="ion-no-padding">
          <IonRow>
            <IonCol class="ion-text-center">
              <div className="polygon-up">
                <img
                  src={polygonDown}
                  alt="arrow shape pointing downwards"
                  onClick={() => {
                    let copy = [...wordIndices];
                    if (index === 0) {
                      copy[position] = 3;
                    } else {
                      copy[position] = index - 1;
                    }
                    setWordIndices(copy);
                  }}
                />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
