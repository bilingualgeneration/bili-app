import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { StoryFactoryButton } from "@/components/StoryFactory/StoryFactoryButton";
import biliCharacter from "@/assets/icons/bili_character.svg";
import "./StoryFactory.css";

interface IntroPage2Props {
  currentPage: number;
}

export const IntroPage2: React.FC<IntroPage2Props> = ({ currentPage }) => {
  const { isImmersive } = useProfile();

  return (
    <>
      <div className="sf-card-grid">
        <IonCard className="ion-no-margin story-page-2-main-card">
          <IonCardHeader className="ion-no-padding sf-card-header">
            <IonCardTitle style={{ textAlign: "left" }}>
              <div id="story-page-2-title">
                Crea más de 90.000 historias diferentes con solo deslizar el
                dedo o hacer clic en un botón.
              </div>
            </IonCardTitle>
            {!isImmersive && (
              <IonCardSubtitle>
                <div id="story-page-2-subtitle">
                  Create over 90,000 different stories with the swipe of your
                  finger or click of a button.
                </div>
              </IonCardSubtitle>
            )}
          </IonCardHeader>
          <IonCardContent>
            <div className="ion-text-center">
              <div className="story-factory-button-container-pg-2">
                <StoryFactoryButton currentPage={currentPage} />
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </div>

      <img
        className="bili-character"
        src={biliCharacter}
        alt="Bili character"
      />
    </>
  );
};
