import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import fabricaRectangle from "@/assets/icons/fabrica_swirl_rectangle.svg";
import fabricaHalfCircle from "@/assets/icons/fabrica_swirl_half_circle.svg";
import biliCharacter from "@/assets/icons/bili_character.svg";
import "./StoryFactory.css";

export const StoryFactoryPage5: React.FC = () => {
  const { isImmersive } = useProfile();
  return (
    <>
      <div
        className="new-felicitaciones-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 110px",
        }}
      >
        <div className="stars-overlay"></div>
        <IonCard className="ion-no-padding ion-no-margin new-felicitaciones-card">
          <IonCardHeader className="felicitaciones-header">
            <IonCardTitle
              className="congrats-text-title-es"
              style={{ marginBottom: "5px" }}
            >
              ¡Felicitaciones!
            </IonCardTitle>

            <IonCardSubtitle className="congrats-text-subtitle-es">
              <div
                className="congrats-text-subtitle-es"
                style={{ marginBottom: "4px" }}
              >
                Has creado y leído cinco cuentos.
              </div>
              <div className="congrats-text-subtitle-es2">¿Puedes seguir?</div>

              {!isImmersive && (
                <>
                  <div
                    id="congrats-text-title-en"
                    style={{ marginBottom: "5px" }}
                  >
                    Congrats!
                  </div>
                  <div
                    id="congrats-text-subtitle-en"
                    style={{ marginBottom: "4px" }}
                  >
                    You've created and read five stories.
                  </div>
                  <div id="congrats-text-subtitle-en">Can you keep going?</div>
                </>
              )}
            </IonCardSubtitle>
          </IonCardHeader>

          <div className="keep-going-button-container">
            <IonButton className="keep-going-button" shape="round">
              <div>
                <div className="keep-going-button-es">¡Sigue adelante!</div>
                {!isImmersive && (
                  <div className="keep-going-button-en">Keep going!</div>
                )}
              </div>
            </IonButton>
          </div>
        </IonCard>

        <img
          className="bili-character-congrats"
          src={biliCharacter}
          alt="Bili character"
        />
      </div>
    </>
  );
};
