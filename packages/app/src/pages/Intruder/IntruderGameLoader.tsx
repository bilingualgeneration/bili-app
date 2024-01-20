//AM
import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { IntruderGame } from "./IntruderGame";

export const IntruderGameLoader: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  //Firestore operations
  const ref = doc(firestore, "intruder-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "error") {
    return "Error loading the game";
  }

  return <IntruderGame game={data} />;
};
