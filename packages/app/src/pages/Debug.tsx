import {
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
import { auth } from "@/components/Firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

export const Debug: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const { startTimer, stopTimer } = useTimeTracker();
  const functions = getFunctions();
  const addClassroom = httpsCallable(functions, "classroom-add");
  const debugClassroomAnalytics = httpsCallable(
    functions,
    "classroom-analytics-debug",
  );
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
                startTimer();
              }}
            >
              start
            </IonButton>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                setTime(stopTimer());
              }}
            >
              get
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>add classroom</IonLabel>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                addClassroom({
                  name: "test name",
                  grades: ["1", "2"],
                  language: "es",
                  allowLanguageToggle: true,
                  isInclusive: false,
                  students: [
                    {
                      firstName: "Vanessa",
                      lastName: "Garcia",
                      primaryContactEmail: "caregivera1@gmail.com",
                      secondaryContactEmail: "caregivera2@gmail.com",
                    },
                    {
                      firstName: "Juan",
                      lastName: "Valesquez",
                      primaryContactEmail: "caregiverb1@gmail.com",
                      secondaryContactEmail: "caregiverb2@gmail.com",
                    },
                  ],
                  notificationMethod: "email",
                });
              }}
            >
              add
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>debug generate classroom analytics</IonLabel>
            <IonButton
              size="small"
              slot="end"
              onClick={() => {
                debugClassroomAnalytics()
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              call
            </IonButton>
          </IonItem>
          <IonItem>
            <Link to="/phrase-matcher-test">
              <IonLabel>Phrase Matcher Test</IonLabel>
            </Link>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
