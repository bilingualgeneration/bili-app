import { auth } from "@/components/Firebase";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { useStudent } from "@/hooks/Student";

export const StudentDebug: React.FC = () => {
  const { signOut: signStudentOut } = useStudent();
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
            <IonLabel>logout</IonLabel>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                // sign out of everything?
                auth.signOut();
                signStudentOut();
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
