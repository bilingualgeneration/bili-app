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
  IonSelect,
  IonSelectOption,
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
//import "./SettingsPage1.css";
import "./Profile.css";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

export const Profile: React.FC = () => {
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

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );

  const handleCountryChange = (event: CustomEvent) => {
    // The selected value is available in event.detail.value
    setSelectedCountry(event.detail.value);
  };

  return (
    <>
      <div className="settings-pg1-container">
        <IonGrid>
          <IonRow className="ion-justify-content-between row">
            <IonCol size="auto">
              <h1 className="child-profile-heading">
                <FormattedMessage
                  id="settings.adult"
                  defaultMessage="Adult Profile"
                  description="Adult Profile page title in settings"
                />
              </h1>
            </IonCol>
          </IonRow>

          <div className="adult-profile-content">
            <IonRow>
              <IonCol>
                <IonLabel>
                  <FormattedMessage
                    id="settings.fullName"
                    defaultMessage="Full name"
                    description="Full name label WITHOUT required asterix in settings"
                  />
                </IonLabel>
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
                <IonLabel>
                  <FormattedMessage
                    id="settings.phone"
                    defaultMessage="Phone number"
                    description="Phone number label in settings"
                  />
                </IonLabel>
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
                <IonLabel>
                  <FormattedMessage
                    id="settings.email"
                    defaultMessage="Email address"
                    description="Email address label WITHOUT required asterix in settings"
                  />
                </IonLabel>
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
                <IonLabel>
                  <FormattedMessage
                    id="settings.dob"
                    defaultMessage="Date of birth"
                    description="Date of birth input label in settings"
                  />
                </IonLabel>
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
                <IonLabel>
                  <FormattedMessage
                    id="settings.country"
                    defaultMessage="Country"
                    description="Country input label in settings"
                  />
                </IonLabel>
                <IonSelect
                  className="country-dropdown"
                  interface="popover"
                  value={selectedCountry}
                  onIonChange={handleCountryChange}
                  justify="space-between"
                  label={selectedCountry ? undefined : "Select one"}
                  label-placement="floating"
                >
                  <IonSelectOption className="country-dropdown-options">
                    United States
                  </IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol class="col-save-changes-button">
                <IonButton shape="round" className="save-changes-button">
                  <FormattedMessage
                    id="settings.saveChangeBtn"
                    defaultMessage="Save changes"
                    description="Save changes button label for Adult Profile within settings page"
                  />
                </IonButton>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </div>
    </>
  );
};
