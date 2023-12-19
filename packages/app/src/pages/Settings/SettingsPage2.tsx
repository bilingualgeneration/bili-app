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
import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import "./SettingsPage1.css";
import "./SettingsPage2.css";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { SideMenu } from "@/components/Settings/SideMenu";

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
      <IonGrid className="ion-no-padding">
        <IonRow>
          <IonCol size="2" className="side-menu-col">
            <SideMenu></SideMenu>
          </IonCol>

          <IonCol>
            <SettingsHeader></SettingsHeader>
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
                      {/* <IonInput
                        className="input"
                        shape="round"
                        fill="outline"
                        placeholder="Choose one"
                      ></IonInput> */}
                      <IonSelect
                        className="country-dropdown"
                        interface="popover"
                        placeholder="Select one"
                        // shape="round"
                        // fill="outline"
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
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
