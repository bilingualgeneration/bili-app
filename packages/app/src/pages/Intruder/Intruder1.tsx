import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";

import { useProfile } from "@/contexts/ProfileContext";
import "./Intruder.scss";
import "../StoryFactory/StoryFactory.scss";
import { FormattedMessage } from "react-intl";

export const Intruder1: React.FC = () => {
  const { isInclusive, isImmersive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);

  return (
    <div style={{ position: "relative" }}>
      <div className="ion-no-padding sf-card">
        <IonCard className="">
          <IonCardContent>
            <div style={{ paddingRight: 100 }}>
              <h1 className="color-selva">El intruso</h1>
              <p>
                El objetivo de este juego es identificar la palabra que no rima
                con el resto.
              </p>

              {!isImmersive && (
                <>
                  <h1 className="color-selva">El intruso</h1>
                  <p>
                    El objetivo de este juego es identificar la palabra que no
                    rima con el resto.
                  </p>
                </>
              )}

              {!isImmersive && (
                <>
                  <h1>
                    <br />
                    Welcome to the story factory!
                  </h1>
                  <h2>A place for silly syllabic reading!</h2>
                </>
              )}

              <div className="ion-text-center" style={{ paddingTop: "4rem" }}>
                <IonButton shape="round" onClick={() => {}}>
                  <div style={{ padding: "0 3rem" }}>
                    <div className="keep-going-button-es">Siguiente</div>
                    {!isImmersive && (
                      <div className="keep-going-button-en">Next</div>
                    )}
                  </div>
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
      <img
        className="bili-character"
        src="/assets/img/bili_in_coat.png"
        alt="Bili character"
      />
    </div>
  );
};
