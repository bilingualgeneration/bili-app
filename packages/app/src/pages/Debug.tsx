import {
  getFunctions,
  httpsCallable
} from 'firebase/functions';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { auth } from "@/components/Firebase";

export const Debug: React.FC = () => {
  const functions = getFunctions();
  const createClassroomFunction = httpsCallable(functions, 'classroom-create');
  const createSchoolFunction = httpsCallable(functions, 'school-create');
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
        <IonButton
          size="small"
          slot="end"
          onClick={() => {
	    createSchoolFunction({
	      name: 'hello world'
	    });
          }}
        >
	  create school
        </IonButton>
        <IonButton
          size="small"
          slot="end"
          onClick={() => {
	    createClassroomFunction({
	      name: 'hello world'
	    });
          }}
        >
	  create classroom
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};
