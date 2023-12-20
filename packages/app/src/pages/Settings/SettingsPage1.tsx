import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useAuth, useUser, useSigninCheck } from "reactfire";
import { useProfile, ProfileContextProvider } from "@/contexts/ProfileContext";
import { SettingsHeader } from "@/components/SettingsHeader";

export const SettingsPage1: React.FC = ({}) => {
  return (
    <>
      <IonPage>
        <SettingsHeader></SettingsHeader>
      </IonPage>
      {/* Child Profile Section */}
    </>
  );
};
