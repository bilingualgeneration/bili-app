import React from "react";
import {
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
import biliCharacter from "@/assets/icons/bili_character.svg";
import { useProfile } from "@/contexts/ProfileContext";
import "./StoryFactory.css";

interface IntroPage1Props {
  currentPage: number;
}

export const IntroPage1: React.FC<IntroPage1Props> = ({ currentPage }) => {
  const { isImmersive } = useProfile();
  return (
    <>
      <div className="ion-no-padding sf-card-grid">
        <IonRow>
          <IonCol size="auto">
            <IonCard className="ion-no-margin story-page-1-main-card">
              <IonCardHeader className="ion-no-padding sf-header-container">
                <IonCardTitle style={{ textAlign: "left" }}>
                  <div id="story-spanish-title">
                    ¡Bienvenidos a la fábrica de cuentos!
                  </div>
                </IonCardTitle>
                <IonCardSubtitle>
                  <div id="story-spanish-title-pt2">
                    ¡Un lugar para lecturas silábicas graciosas!
                  </div>
                </IonCardSubtitle>
                {!isImmersive && (
                  <>
                    <div id="story-english-subtitle">Welcome to the</div>
                    <div id="story-english-subtitle">story factory!</div>
                    <div id="story-english-subtitle-pt2">
                      A place for silly syllabic reading!
                    </div>
                  </>
                )}
              </IonCardHeader>

              <IonCardContent>
                <IonRow className="ion-text-center">
                  <IonCol>
                    <div className="story-factory-button-container">
                      <StoryFactoryButton currentPage={currentPage} />
                    </div>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </div>

      <img
        className="bili-character"
        src={biliCharacter}
        alt="Bili character"
      />
    </>
  );
};
