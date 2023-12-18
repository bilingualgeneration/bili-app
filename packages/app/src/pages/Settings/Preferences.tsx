import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";
import Question from "@/assets/icons/question.svg?react";
import { chevronForward } from "ionicons/icons";
import "./Preferences.css";

export const Preferences: React.FC = () => {
  return (
    <>
      <IonList className="preferences-style">
        <IonItem>
          <div className="title-style">
            <h1>Preferences</h1>
          </div>
        </IonItem>

        <IonItem>
          <IonSelect
            placeholder="English"
            interface="popover"
            toggleIcon={chevronForward}
          >
            <div className="label-style" slot="label">
              <h4>Settings language</h4>
              <button className="question-button">
                <Question />
              </button>
            </div>
            <IonSelectOption value="english">English</IonSelectOption>
            <IonSelectOption value="spanish">Spanish</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonSelect
            placeholder="Immersion"
            interface="popover"
            toggleIcon={chevronForward}
          >
            <div className="label-style" slot="label">
              <h4>Bilingual vs. Immersion Mode</h4>
              <button className="question-button">
                <Question />
              </button>
            </div>
            <IonSelectOption value="bilingual">Bilingual</IonSelectOption>
            <IonSelectOption value="immersion">Immersion</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonToggle justify="space-between" checked={true}>
            <div className="label-style">
              <h4>Inclusive Spanish</h4>
              <button className="question-button">
                <Question />
              </button>
            </div>
          </IonToggle>
        </IonItem>

        <IonItem>
          <IonSelect
            placeholder="Unlimited"
            interface="popover"
            toggleIcon={chevronForward}
          >
            <div className="label-style" slot="label">
              <h4>Daily playtime limit</h4>
              <button className="question-button">
                <Question />
              </button>
            </div>
            <IonSelectOption value="unlimited">Unlimited</IonSelectOption>
            <IonSelectOption value="30">30mins</IonSelectOption>
            <IonSelectOption value="1">1 hour</IonSelectOption>
            <IonSelectOption value="1.30">1 hour 30 mins</IonSelectOption>
            <IonSelectOption value="2">2 hours</IonSelectOption>
            <IonSelectOption value="2.30">2 hours 30 mins</IonSelectOption>
            <IonSelectOption value="3">3 hours</IonSelectOption>
            <IonSelectOption value="3.30">3 hours 30 mins</IonSelectOption>
            <IonSelectOption value="4">4 hours</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonToggle justify="space-between" checked={true}>
            <div className="label-style">
              <h4>Sound effects</h4>
              <button className="question-button">
                <Question />
              </button>
            </div>
          </IonToggle>
        </IonItem>
      </IonList>
    </>
  );
};
