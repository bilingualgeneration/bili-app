import React from "react";
import {
  IonText,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import "./FeedbackScreen.css";

interface FeedbackScreenProps {
  image: string;
  text: string;
  primaryButtonText: string;
  secondaryButtonText?: string; // optional for esen
  characterImage: string;
  onButtonClick: () => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  image,
  text,
  primaryButtonText,
  secondaryButtonText,
  characterImage,
  onButtonClick,
}) => {
  const { language } = useLanguageToggle();
  return (
    <IonGrid className="full-height-grid">
      <IonRow className="ion-align-items-start ion-justify-content-between">
        <IonCol size="12" sizeMd="7" className="left-content">
          <div className="feedback-card">
            <IonImg src={image} alt="Reward Icon" className="reward-image" />
            <IonText className="semibold feedback-text">
              <h1>{text}</h1>
            </IonText>
          </div>

          <IonButton
            expand="block"
            shape="round"
            className="feedback-button"
            onClick={onButtonClick}
          >
            <div className="button-text">
              <span className="semibold text-xl">{primaryButtonText}</span>
              {language === "esen" && (
                <span className="text-sm">{secondaryButtonText}</span>
              )}
            </div>
          </IonButton>
        </IonCol>

        <IonCol size="12" sizeMd="5" className="character-container">
          <IonImg
            src={characterImage}
            alt="Character"
            className="character-image"
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default FeedbackScreen;
