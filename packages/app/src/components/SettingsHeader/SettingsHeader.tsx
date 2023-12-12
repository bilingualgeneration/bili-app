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
import biliLogo from "../../assets/icons/bili.svg";

export const SettingsHeader: React.FC = ({}) => {
  return (
    <>
      <IonHeader className="ion-no-border settings-header">
        <IonToolbar className="settings-toolbar">
          <IonButtons>
            <IonButton className="bili-logo-settings-page">
              <img src={biliLogo} />
            </IonButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                // route and logic for user to rate app
              }}
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
                    <IonLabel style={{ color: "var(--Base-Selva)" }}>
                      Rate this app
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
