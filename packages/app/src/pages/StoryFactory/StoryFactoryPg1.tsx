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
import StoryFactoryButton from "@/components/StoryFactory/StoryFactoryButton";
import biliCharacter from "@/assets/icons/bili_character.svg";
import { useProfile } from "@/contexts/ProfileContext";

interface IntroPage1Props {
  currentPage: number;
}

const IntroPage1: React.FC<IntroPage1Props> = ({ currentPage }) => {
  const { isImmersive } = useProfile();
  return (
    <>
      <IonCard className="story-page-2-main-card">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol>
              <IonCardHeader className="story-header">
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
                  </>
                )}
              </IonCardHeader>
            </IonCol>

            <IonCol size="4">
              {/* <div className='bili-overlay'> */}
              <img src={biliCharacter} alt="Bili character" />
              {/* </div> */}
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center">
            <StoryFactoryButton currentPage={currentPage} />
          </IonRow>
        </IonGrid>
      </IonCard>
    </>
  );
};

export default IntroPage1;
