import {
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";
import {useTimeTracker} from '@/hooks/TimeTracker';
import {useState} from 'react';
import { Preferences } from "@capacitor/preferences";
import { auth } from "@/components/Firebase";

export const Debug: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const {startMark, getTime} = useTimeTracker();
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
          <IonItem>
            <IonLabel>timetracker {time}s</IonLabel>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                startMark();
              }}
            >
              start
            </IonButton>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
		setTime(getTime());
              }}
            >
              get
            </IonButton>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
