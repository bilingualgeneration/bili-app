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

interface StoryFactoryPage4aProps {
  currentPage: number;
}

export const StoryFactoryPage4a: React.FC<StoryFactoryPage4aProps> = ({
  currentPage,
}) => {
  const [wordIndices, setWordIndices] = useState([0, 0, 0, 0]);
  return <></>;
};
