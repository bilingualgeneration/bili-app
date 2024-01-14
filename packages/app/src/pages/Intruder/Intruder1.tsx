import React from "react";
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
import { StoryFactoryButton } from "@/components/StoryFactory/StoryFactoryButton";
import { useProfile } from "@/contexts/ProfileContext";
import "./Intruder.scss";
import "../StoryFactory/StoryFactory.css";

export const Intruder1: React.FC = () => {
  const { isImmersive } = useProfile();
  return (
    <>
      <IonCard className="story-page-2-main-card">
        <IonGrid class="ion-no-margin">
          <IonRow class="ion-justify-content-left">
            <IonCol size="auto" size-md="9">
              <IonCardHeader>
                <IonCardTitle style={{ textAlign: "left" }}>
                  <div id="story-bienvenidos">El intruso</div>
                </IonCardTitle>
                <IonCardSubtitle>
                  <div id="story-un-lugar">
                    El objetivo de este juego es identificar la palabra que no
                    rima con el resto.
                  </div>
                </IonCardSubtitle>
                {!isImmersive && (
                  <>
                    <div id="story-welcome" style={{ marginTop: "4rem" }}>
                      The Intruder
                    </div>
                    <div id="story-a-place">
                      The goal of this game is to identify the word that does
                      not rhyme with the rest.
                    </div>
                  </>
                )}
              </IonCardHeader>
              <div className="story-factory-button-container">
                <IonButton />
              </div>
            </IonCol>
            <IonCol>
              <img
                className="bili-character"
                src={"/assets/img/bili_in_coat.png"}
                alt="Bili character"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </>
  );
};
