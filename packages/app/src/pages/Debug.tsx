import {
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { useAuth } from "reactfire";

export const Debug: React.FC = () => {
  const auth = useAuth();
  return (
    <IonCard style={{ width: "100%" }}>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel>localStorage userLocale</IonLabel>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                localStorage.removeItem("userLocale");
              }}
            >
              clear
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>tutorials</IonLabel>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                Preferences.remove({ key: "shouldShowSettingsTutorial" });
              }}
            >
              reset
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>logout</IonLabel>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                auth.signOut();
              }}
            >
              logout
            </IonButton>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
