import {
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
  IonImg,
  IonText,
} from "@ionic/react";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
import { auth } from "@/components/Firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

import heartIcon from "@/assets/icons/heart_2.svg";
import biliCharacter from "@/assets/icons/bili_character.svg";
import DialogScreen from "../components/DialogScreen/DialogScreen";

export const Debug: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const { startTimer, stopTimer } = useTimeTracker();
  const functions = getFunctions();
  const addClassroom = httpsCallable(functions, "classroom-add");
  const debugClassroomAnalytics = httpsCallable(
    functions,
    "classroom-analytics-debug",
  );
  const [showDialog, setShowDialog] = useState(false);
  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  if (showDialog) {
    return (
      <DialogScreen
        primaryButtonText="Siguiente"
        secondaryButtonText="Next"
        characterImage={biliCharacter}
        onButtonClick={handleButtonClick}
      >
        {/* Pass the card content as children */}
        <IonImg src={heartIcon} alt="Reward Icon" className="reward-image" />
        <IonText className="semibold dialog-text">
          <h1>You earned a heart!</h1>
        </IonText>
      </DialogScreen>
    );
  }

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
          <IonCard style={{ width: "100%" }}>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>Feedback Screen</IonLabel>
                  <IonButton
                    size="small"
                    slot="end"
                    onClick={() => setShowDialog(true)} // Show FeedbackScreen
                  >
                    Open
                  </IonButton>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
