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
import miniFabricaCard from "@/assets/icons/mini_fabrica_card.svg";
import "./StoryFactory.css";

interface IntroPage3Props {
  currentPage: number;
}

export const IntroPage3: React.FC<IntroPage3Props> = ({ currentPage }) => {
  const { isImmersive } = useProfile();

  return (
    <>
      <IonCard className="story-page-2-main-card story-page-3-main-card">
        <IonGrid>
          <IonRow class="ion-justify-content-left">
            <IonCol size="8.5">
              <IonCardHeader style={{ padding: "5%" }}>
                <IonCardTitle class="ion-text-left">
                  <div id="story-page-2-title">
                    {" "}
                    Esta es tu fábrica de cuentos. Puedes crear un cuento
                    presionando el botón Actualizar o deslizando o haciendo clic
                    en cada sección de la historia.
                  </div>
                </IonCardTitle>
                {!isImmersive && (
                  <IonCardSubtitle>
                    <div id="story-page-2-subtitle">
                      This is your story factory. You can create a story by
                      either hitting the Refresh button, or by swiping or
                      clicking each section of the story.
                    </div>
                  </IonCardSubtitle>
                )}
              </IonCardHeader>
            </IonCol>
            <IonCol>
              <img
                className="bili-character"
                src={biliCharacter}
                alt="Bili character"
              />
            </IonCol>
            {/* <IonCol size="4">
              <img className='bili-character' src={biliCharacter} alt="Bili character" />
            </IonCol> */}
          </IonRow>
        </IonGrid>

        <div className="story-factory-button-container">
          <StoryFactoryButton currentPage={currentPage} />
        </div>
      </IonCard>
    </>
  );
};
