import {
  IonButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonInput,
} from "@ionic/react";
import {
  addOutline,
  chevronForwardCircle,
  chevronForwardCircleOutline,
  ellipse,
  ellipsisHorizontal,
  sparkles,
} from "ionicons/icons";
import { useMaskito } from "@maskito/react";
import { SettingsHeader } from "@/components/SettingsHeader";
import "./SettingsPage1.css";
import "./SettingsPage2.css";
import { useEffect, useRef } from "react";

export const SettingsPage2: React.FC = () => {
  const phoneMask = useMaskito({
    options: {
      mask: [
        "+",
        "1",
        " ",
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
    },
  });

  return (
    <>
      <SettingsHeader></SettingsHeader>

      <div className="settings-pg1-container">
        <IonGrid>
          <IonRow className="ion-justify-content-between row">
            <IonCol size="auto">
              <h1 className="child-profile-heading">Adult Profile</h1>
            </IonCol>
          </IonRow>

          <div className="adult-profile-content">
            <IonRow>
              <IonCol>
                <IonLabel>Full name</IonLabel>
                <IonInput
                  className="input"
                  shape="round"
                  fill="outline"
                  placeholder="Bilingual Generation"
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Phone number</IonLabel>
                <IonInput
                  ref={async (phoneInput) => {
                    if (phoneInput) {
                      const input = await phoneInput.getInputElement();
                      phoneMask(input);
                    }
                  }}
                  className="input"
                  type="tel"
                  shape="round"
                  fill="outline"
                  placeholder="+1 (xxx) xxx-xxxx"
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Email address</IonLabel>
                <IonInput
                  className="input"
                  type="email"
                  shape="round"
                  fill="outline"
                  placeholder="bilingual.generation@bili.com"
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Date of birth</IonLabel>
                <IonInput
                  className="input date-type"
                  type="date"
                  shape="round"
                  fill="outline"
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Country</IonLabel>
                <IonInput
                  className="input"
                  shape="round"
                  fill="outline"
                  placeholder="Choose one"
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol class="col-save-changes-button">
                <IonButton shape="round" className="save-changes-button">
                  Save changes
                </IonButton>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </div>
    </>
  );
};
