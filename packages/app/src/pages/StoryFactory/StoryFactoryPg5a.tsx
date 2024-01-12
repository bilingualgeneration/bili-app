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
import "./StoryFactory.css";

export const StoryFactoryPage5a: React.FC = () => (
  <>
    <div className="new-felicitaciones-container">
      <div className="stars-overlay"></div>
      <IonCard className="new-felicitaciones-card">
        <IonGrid>
          <IonRow>
            <IonCol size="10">
              <IonCardHeader className="felicitaciones-header">
                <IonCardTitle
                  className="congrats-text-title-es"
                  style={{ textAlign: "left" }}
                >
                  ¡Felicitaciones!
                </IonCardTitle>

                <IonCardSubtitle className="congrats-text-subtitle-es">
                  Has creado y leído cinco cuentos. ¿Puedes seguir?
                </IonCardSubtitle>

                <IonRow style={{ height: "6vh" }}></IonRow>

                <div id="congrats-text-title-en">Congrats!</div>
                <div id="congrats-text-subtitle-en">
                  You've created and read five stories. Can you keep going?
                </div>
              </IonCardHeader>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonButton
              className="keep-going-button"
              shape="round"
              style={{
                position: "absolute",
                bottom: "-4vh",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div>
                <div className="keep-going-button-es">¡Sigue adelante!</div>
                <div className="keep-going-button-en">Keep going!</div>
              </div>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonCard>
    </div>
  </>
);
