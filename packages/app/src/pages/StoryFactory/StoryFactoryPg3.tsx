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
import StoryFactoryButton from "@/components/StoryFactory/StoryFactoryButton";
import biliCharacter from "@/assets/icons/bili_character.svg";
import miniFabricaCard from "@/assets/icons/mini_fabrica_card.svg";

interface IntroPage3Props {
  currentPage: number;
}

const IntroPage3: React.FC<IntroPage3Props> = ({ currentPage }) => {
  const { isImmersive } = useProfile();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonCard className="story-page-2-main-card">
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonCol>
                <IonCardHeader className="story-header">
                  <IonCardTitle style={{ textAlign: "left" }}>
                    <div id="story-page-2-title">
                      {" "}
                      Esta es tu fábrica de cuentos. Puedes crear un cuento
                      presionando el botón Actualizar o deslizando o haciendo
                      clic en cada sección de la historia.
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

                {/* mini Fabrica de cuentos card */}

                <IonCol class="ion-text-center">
                  <div className="mini-fabrica-card-page-3">
                    <img
                      src={miniFabricaCard}
                      alt="Miniature display of the fabrica card slot game"
                    />
                  </div>
                </IonCol>

                {/* end mini Fabrica de cuentos card */}
              </IonCol>

              <IonCol size="4">
                <img src={biliCharacter} alt="Bili character" />
              </IonCol>
            </IonRow>

            <IonRow class="ion-justify-content-center">
              <StoryFactoryButton currentPage={currentPage} />
            </IonRow>
          </IonGrid>
        </IonCard>
      </div>
    </>
  );
};

export default IntroPage3;
