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

export const StoryFactoryPage6: React.FC = () => (
  <>
    <IonGrid class="ion-no-padding">
      <IonRow class="ion-justify-content-center">
        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle">
            <img src={fabricaHalfCircle} alt="grey half circle piece" />
          </div>
        </IonCol>

        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle fabrica-flipped-swirl">
            <img src={fabricaHalfCircle} alt="grey half circle piece" />
          </div>
        </IonCol>

        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle">
            <img src={fabricaHalfCircle} alt="grey half circle piece" />
          </div>
        </IonCol>

        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle fabrica-flipped-swirl">
            <img src={fabricaHalfCircle} alt="grey half circle piece" />
          </div>
        </IonCol>
      </IonRow>

      <IonRow class="ion-justify-content-center">
        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle">
            <img src={fabricaRectangle} alt="grey rectangle piece" />
          </div>
        </IonCol>

        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle">
            <img src={fabricaRectangle} alt="grey rectangle piece" />
          </div>
        </IonCol>

        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle">
            <img src={fabricaRectangle} alt="grey rectangle piece" />
          </div>
        </IonCol>

        <IonCol size="2" class="ion-text-center">
          <div className="fabrica-swirl-rectangle">
            <img src={fabricaRectangle} alt="grey rectangle piece" />
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>

    <IonCard className="felicitaciones-card">
      <IonGrid>
        <IonRow>
          <IonCol size="10">
            <IonCardHeader className="felicitaciones-header">
              <IonCardTitle
                className="felicitaciones-title"
                style={{ textAlign: "left" }}
              >
                ¡Felicitaciones!
              </IonCardTitle>

              <IonCardSubtitle className="felicitaciones-subtitle">
                Has creado y leído cinco cuentos. ¿Puedes seguir?
              </IonCardSubtitle>

              <IonRow style={{ height: "6vh" }}></IonRow>

              <div id="congrats-text-bold">Congrats!</div>
              <div id="congrats-text-reg">
                You've created and read five stories. Can you keep going?
              </div>
            </IonCardHeader>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>

    <IonGrid>
      <IonRow class="ion-justify-content-center">
        <IonCol class="ion-text-center">
          <div style={{ position: "relative" }}>
            <IonButton
              className="sigue-adelante-button"
              shape="round"
              style={{
                position: "absolute",
                bottom: "-4vh",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div>
                <div className="sigue-button-es">¡Sigue adelante!</div>
                <div className="sigue-button-en">Keep going!</div>
              </div>
            </IonButton>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  </>
);
