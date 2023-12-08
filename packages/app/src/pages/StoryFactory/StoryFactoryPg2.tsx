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
      <IonCard className="story-page-2-main-card">
        <IonGrid>
          <IonRow class="ion-justify-content-left">
            <IonCol size="12" size-md="9">
              <IonCardHeader className="story-header">
                <IonCardTitle style={{ textAlign: "left" }}>
                  <div id="story-page-2-title">
                    En este juego, podrás crear más de 90.000 historias
                    diferentes con solo deslizar el dedo o hacer clic en un
                    botón. Haz clic en "Siguiente" para ver cómo.
                  </div>
                </IonCardTitle>
                {!isImmersive && (
                  <IonCardSubtitle>
                    <div id="story-page-2-subtitle">
                      In this game, you can create over 90,000 different stories
                      with the swipe of your finger or click of a button. Click
                      “Next” to see how.
                    </div>
                  </IonCardSubtitle>
                )}
              </IonCardHeader>
            </IonCol>
          </IonRow>

          <IonCardContent class="story-button-container">
            <IonRow class="ion-justify-content-center">
              {/* <IonCol size="auto"> */}
              <StoryFactoryButton currentPage={currentPage} />
              {/* </IonCol> */}
            </IonRow>
          </IonCardContent>
        </IonGrid>
      </IonCard>

      <img
        className="bili-character"
        src={biliCharacter}
        alt="Bili character"
      />
    </>
  );
};
