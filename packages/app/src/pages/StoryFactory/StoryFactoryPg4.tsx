import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { FabricaCard } from "@/components/StoryFactory/FabricaCard";
import fabricaRectangle from "@/assets/icons/fabrica_swirl_rectangle.svg";
import fabricaHalfCircle from "@/assets/icons/fabrica_swirl_half_circle.svg";
import refreshButton from "@/assets/icons/refresh_button.svg";
import "./StoryFactory.css";

const words = [
  [
    { es: "La vaca", en: "The cow" },
    { es: "Mi mamá", en: "My Mom" },
    { es: "El sapo", en: "The frog" },
    { es: "Doña María", en: "Doña María" },
  ],
  [
    { es: "nos da", en: "gives" },
    { es: "puso", en: "put" },
    { es: "come", en: "eats" },
    { es: "dibuja", en: "draws" },
  ],
  [
    { es: "leche", en: "milk" },
    { es: "pan dulce", en: "sweet bread" },
    { es: "insectos", en: "insects" },
    { es: "las nubes", en: "the clouds" },
  ],
  [
    { es: "los sábados.", en: "Saturdays" },
    { es: "en la mesa.", en: "on the table." },
    { es: "en el bosque.", en: "in the forest." },
    { es: "en el cielo.", en: "in the sky." },
  ],
];

const FactoryButton: React.FC = () => {
  return (
    <div className="fabrica-swirl-rectangle">
      <img src={fabricaHalfCircle} alt="grey half circle piece" />
    </div>
  );
};

interface StoryFactoryPage4Props {
  currentPage: number;
}

export const StoryFactoryPage4: React.FC<StoryFactoryPage4Props> = ({
  currentPage,
}) => {
  const [wordIndices, setWordIndices] = useState([0, 0, 0, 0]);
  return (
    <>
      <IonGrid class="ion-no-padding">
        <IonRow class="ion-justify-content-center">
          {[1, 2, 3, 4].map((number) => (
            <IonCol size="2" class="ion-text-center" key={number}>
              <div
                className={`fabrica-swirl-rectangle ${
                  number % 2 == 0 ? "" : "fabrica-flipped-swirl"
                }`}
              >
                <img src={fabricaHalfCircle} alt="grey half circle piece" />
              </div>
              <div className="fabrica-rectangle">
                <img src={fabricaRectangle} alt="grey rectangle piece" />
              </div>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <IonCard className="fabrica-de-cuentos-large-card">
        <IonCardContent className="fabrica-card-content">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCardHeader class="ion-align-items-center">
                  <IonCardTitle>
                    <div className="fabrica-text-container">
                      <div id="fabrica-header-text">¡Fábrica de cuentos!</div>
                    </div>
                  </IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
            <IonRow>
              {wordIndices.map((index, position) => (
                <IonCol key={position} size="3">
                  <FabricaCard
                    es={words[position][index].es}
                    en={words[position][index].en}
                    {...{ setWordIndices, wordIndices, index, position }}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>

      <img
        className="refresh-button ion-hide"
        src={refreshButton}
        alt="Refresh button icon"
      />
    </>
  );
};
