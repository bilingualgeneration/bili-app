import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";
import almohada1 from "@/assets/icons/intruder_almohada_1.svg";
import empanada from "@/assets/icons/intruder_empanada.svg";
import "./Intruder.scss";
import "../StoryFactory/StoryFactory.css";

export const Intruder2: React.FC = () => {
  const { isImmersive } = useProfile();

  const initialStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    boxShadow: "-4.638px 9.275px 27.826px 0px rgba(0, 0, 0, 0.25)",
  };

  const correctStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    border: "8.4px solid var(--alerts-status-success, #12D18E)",
    boxShadow: "0px 8.4px 25.2px 0px #12D18E",
  };

  const incorrectStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    border: "8.4px solid var(--Categories-Error, #F0091B)",
    boxShadow: "0px 8.4px 25.2px 0px #F0091B",
  };
  const [cardColors, setCardColors] = useState({
    1: initialStyle,
    2: initialStyle,
    3: initialStyle,
  });

  // Function to handle card click
  const handleCardClick = (cardNumber: string, isCorrect: boolean) => {
    setCardColors((prevColors) => ({
      ...prevColors,
      [cardNumber]: isCorrect ? correctStyle : incorrectStyle,
    }));
  };

  return (
    <>
      <div className="intruder-game-title">
        <h2>¿Qué palabra no rima?</h2>
        {!isImmersive && (
          <>
            <p>Which word does not rhyme?</p>
          </>
        )}
      </div>
      <IonGrid id="intruder-styles" class="">
        <IonRow class="">
          <IonCol size="auto" size-md="4">
            <IonCard
              className="intruder-card-style"
              style={cardColors[1]}
              onClick={() => handleCardClick("1", false)}
            >
              <img src={almohada1} />
              <IonCardHeader>
                <IonCardTitle>almohada</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="auto" size-md="4">
            <IonCard
              className="intruder-card-style"
              style={cardColors[2]}
              onClick={() => handleCardClick("2", false)}
            >
              <img src={empanada} />
              <IonCardHeader>
                <IonCardTitle>empanada</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="auto" size-md="4">
            <IonCard
              className="intruder-card-style"
              style={cardColors[3]}
              onClick={() => handleCardClick("3", true)}
            >
              <img src="/assets/img/intruder_boca.png" />
              <IonCardHeader>
                <IonCardTitle>boca</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
