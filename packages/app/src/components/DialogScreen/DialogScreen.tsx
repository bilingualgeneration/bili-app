import React from "react";
import { IonButton, IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import "./DialogScreen.css";

interface DialogScreenProps {
  children: React.ReactNode;
  primaryButtonText: string;
  secondaryButtonText?: string; // optional for esen
  characterImage: string;
  onButtonClick: () => void;
}

const DialogScreen: React.FC<DialogScreenProps> = ({
  children,
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
          <div className="dialog-card">{children}</div>

          <IonButton
            expand="block"
            shape="round"
            className="dialog-button"
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

export default DialogScreen;
