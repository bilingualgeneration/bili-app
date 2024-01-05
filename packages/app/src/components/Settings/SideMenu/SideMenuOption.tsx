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
import { FormattedMessage } from "react-intl";
import "./SideMenu.css";

interface SideMenuOptionProps {
  icon: any; //TODO: need to figure out better type
  id: string;
  defaultMessage: string;
  description: string;
  to?: string;
  isActive?: boolean;
}

export const SideMenuOption: React.FC<SideMenuOptionProps> = ({
  icon,
  id,
  defaultMessage,
  description,
  to,
  isActive,
}) => {
  // TODO: remove hover-highlight class and replace with theme
  return (
    <IonItem
      className={isActive ? "hover-highlight-active" : "hover-highlight"}
      id={`side-menu-button-${id.replace(".", "-")}`}
      routerLink={to}
    >
      <IonIcon slot="start" icon={icon} />
      <IonLabel className="menu-label">
        <FormattedMessage
          id={id}
          defaultMessage={defaultMessage}
          description={description}
        />
      </IonLabel>
    </IonItem>
  );
};
