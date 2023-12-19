import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  arrowBackOutline,
  gridOutline,
  informationCircleOutline,
  logOutOutline,
  optionsOutline,
  personOutline,
  statsChartOutline,
} from "ionicons/icons";
import "./SideMenu.css";
import { FormattedMessage } from "react-intl";

interface SideMenuOptionProps {
  icon: any; //TODO: need to figure out better type
  id: string;
  defaultMessage: string;
  description: string;
}

export const SideMenuOption: React.FC<SideMenuOptionProps> = ({
  icon,
  id,
  defaultMessage,
  description,
}) => {
  return (
    <>
      <IonButton className="side-menu-btns hover">
        <IonGrid>
          <IonRow class="options-row">
            <IonCol size="auto">
              <IonIcon className="side-menu-icon" icon={icon} />
            </IonCol>

            <IonCol>
              <IonLabel className="overview-label">
                <FormattedMessage
                  id={id}
                  defaultMessage={defaultMessage}
                  description={description}
                />
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonButton>
    </>
  );
};
