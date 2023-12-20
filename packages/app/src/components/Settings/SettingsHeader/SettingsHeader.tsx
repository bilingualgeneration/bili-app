import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonLabel,
  IonCol,
} from "@ionic/react";
import { starOutline } from "ionicons/icons";
import "./SettingsHeader.css";
import biliLogo from "../../../assets/icons/bili.svg";
import { FormattedMessage } from "react-intl";

export const SettingsHeader: React.FC = ({}) => {
  return (
    <>
      <IonHeader className="ion-no-border settings-header">
        <IonToolbar className="settings-toolbar">
          <IonTitle>
            <img src={biliLogo} className="bili-logo-settings-page" />
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                // route and logic for user to rate app
              }}
              disabled={true}
            >
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonIcon
                      icon={starOutline}
                      size="small"
                      style={{ color: "var(--Base-Selva)" }}
                    />
                  </IonCol>
                  <IonCol>
                    <IonLabel
                      style={{ color: "var(--Base-Selva)", marginLeft: "10%" }}
                    >
                      <FormattedMessage
                        id="header.rate"
                        defaultMessage="Rate this app"
                        description="Clickable text that takes user to rate the Bili app"
                      />
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};
