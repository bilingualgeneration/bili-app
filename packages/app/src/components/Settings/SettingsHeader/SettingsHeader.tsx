import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonLabel,
  IonCol,
} from "@ionic/react";
import { starOutline } from "ionicons/icons";
import "./SettingsHeader.scss";
import biliLogo from "@/assets/icons/bili.svg";
import { FormattedMessage } from "react-intl";
import React from "react";

export const SettingsHeader: React.FC = ({}) => {
  return (
    <>
      <IonHeader className="ion-no-border settings-header">
        <img src={biliLogo} className="bili-logo-settings-page" />
      </IonHeader>
    </>
  );
};
