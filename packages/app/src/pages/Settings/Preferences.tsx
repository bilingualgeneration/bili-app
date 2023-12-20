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
import { Popover } from "@/components/Popover";
import "./Preferences.css";
import { useIntl } from "react-intl";

export const Preferences: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <IonList className="preferences-style">
        <IonItem style={{ marginBottom: "2rem" }}>
          <div className="title-style">
            <h1>Preferences</h1>
          </div>
        </IonItem>

        <IonItem>
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.popover1",
              defaultMessage:
                "Choose the language you will see in settings. This should be based on your language preferences as an adult.",
              description:
                "Description of the language you will see in settings.",
            })}
            trigger="click-trigger1"
          />
          <Question id="click-trigger1" />
          <IonSelect
            placeholder="English"
            interface="popover"
            toggleIcon={chevronForward}
          >
            <div className="label-style" slot="label">
              <h4>Settings language</h4>
            </div>
            <IonSelectOption value="english">English</IonSelectOption>
            <IonSelectOption value="spanish">Spanish</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.popover2",
              defaultMessage:
                "Choose the language mode for your child's experience in the app. Bilingual means your child will see the content in English and Spanish. Immersion means your child will only see the content in Spanish.",
              description:
                "Description of the language mode for your child's experience in the app",
            })}
            trigger="click-trigger2"
          />
          <Question id="click-trigger2" />
          <IonSelect
            placeholder="Immersion"
            interface="popover"
            toggleIcon={chevronForward}
          >
            <div className="label-style" slot="label">
              <h4>Bilingual vs. Immersion Mode</h4>
            </div>
            <IonSelectOption value="bilingual">Bilingual</IonSelectOption>
            <IonSelectOption value="immersion">Immersion</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.popover3",
              defaultMessage:
                "Choose inclusive Spanish to opt for terms like 'amigues,' 'niñes,' and 'Latine' to personalize your experience when referring to groups or non-binary characters. Disable this feature if you do not want to see these terms.",
              description:
                "Description of the inclusive language mode with gender neutral pronouns",
            })}
            trigger="click-trigger3"
          />
          <Question id="click-trigger3" />
          <IonToggle justify="space-between" checked={true} mode="ios">
            <div className="label-style">
              <h4>Inclusive Spanish</h4>
            </div>
          </IonToggle>
        </IonItem>

        <IonItem>
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.popover4",
              defaultMessage:
                "Determine how long your child plays on the app each day.",
              description: "Daily playtime limit",
            })}
            trigger="click-trigger4"
          />
          <Question id="click-trigger4" />
          <IonSelect
            placeholder="Unlimited"
            interface="popover"
            toggleIcon={chevronForward}
          >
            <div className="label-style" slot="label">
              <h4>Daily playtime limit</h4>
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
          <Popover
            content={intl.formatMessage({
              id: "settingsProgress.popover5",
              defaultMessage:
                "Enable this feature to hear sound effects associated with the app.",
              description: "Sound effects mode",
            })}
            trigger="click-trigger5"
          />
          <Question id="click-trigger5" />
          <IonToggle justify="space-between" checked={true} mode="ios">
            <div className="label-style">
              <h4>Sound effects</h4>
            </div>
          </IonToggle>
        </IonItem>
      </IonList>
    </>
  );
};
