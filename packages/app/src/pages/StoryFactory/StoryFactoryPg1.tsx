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
      <IonCard className="story-page-2-main-card">
        <IonGrid class="ion-no-margin">
          <IonRow class="ion-justify-content-left">
            <IonCol size="auto" size-md="9">
              <IonCardHeader>
                <IonCardTitle style={{ textAlign: "left" }}>
                  <div id="story-bienvenidos">¡Bienvenidos a la</div>
                  <div id="story-bienvenidos">fábrica de cuentos!</div>
                </IonCardTitle>
                <IonCardSubtitle>
                  <div id="story-un-lugar">
                    ¡Un lugar para lecturas silábicas graciosas!
                  </div>
                </IonCardSubtitle>
                {!isImmersive && (
                  <>
                    <br />
                    <br />
                    <br />
                    <div id="story-welcome">Welcome to the story factory!</div>
                    <div id="story-a-place">
                      A place for silly syllabic reading!
                    </div>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </IonCardHeader>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="story-factory-button-container">
          <StoryFactoryButton currentPage={currentPage} />
        </div>
      </IonCard>

      <img
        className="bili-character"
        src={biliCharacter}
        alt="Bili character"
      />
    </>
  );
};
