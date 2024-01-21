import { Browser } from "@capacitor/browser";
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
import "./SideMenu.scss";

interface SideMenuOptionProps {
  icon: any; //TODO: need to figure out better type
  label: any;
  to?: string;
  isActive?: boolean;
}

interface IonItemProps {
  [key: string]: any;
}

const urlRegex = /^(https?):\/\/.*$/i;

export const SideMenuOption: React.FC<SideMenuOptionProps> = ({
  icon,
  label,
  to,
  isActive,
}) => {
  // conditionally build props
  // so that an external url can be passed to the to prop
  let props: IonItemProps = {};
  if (to) {
    if (urlRegex.test(to)) {
      // is an external url
      props.onClick = () => {
        Browser.open({ url: to });
      };
    } else {
      // is an internal link
      props.routerLink = to;
    }
  }

  // TODO: remove hover-highlight class and replace with theme
  return (
    <IonItem
      className={isActive ? "hover-highlight-active" : "hover-highlight"}
      {...props}
    >
      <IonIcon slot="start" icon={icon} />
      <IonLabel className="menu-label">{label}</IonLabel>
    </IonItem>
  );
};
