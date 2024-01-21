import React from "react";
import { useAuth } from "reactfire";
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import {
  arrowBackOutline,
  gridOutline,
  informationCircleOutline,
  logOutOutline,
  optionsOutline,
  personOutline,
  statsChartOutline,
} from "ionicons/icons";
import { FormattedMessage } from "react-intl";
import "./SideMenu.scss";
import { SideMenuOption } from "./SideMenuOption";
import { useLocation } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";

interface Option {
  icon: any;
  label: any;
  to: string;
  isActive?: boolean;
}

export const SideMenu: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();

  // todo: remove this button and functionality; it's only here for dev purposes
  const resetTutorial = async () => {
    Preferences.remove({ key: "shouldShowSettingsTutorial" });
  };

  const options: Option[] = [
    {
      icon: gridOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.overview"}
          defaultMessage={"Overview"}
          description={"Overview label for side menu on settings page"}
        />
      ),
      to: "/settings/overview",
      isActive: location.pathname === "/settings/overview",
    },
    {
      icon: personOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.profile"}
          defaultMessage={"Profile"}
          description={"Profile label for side menu on settings page"}
        />
      ),
      to: "/settings/profile",
      isActive: location.pathname === "/settings/profile",
    },
    {
      icon: optionsOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.preferences"}
          defaultMessage={"Preferences"}
          description={"Preferences label for side menu on settings page"}
        />
      ),
      to: "/settings/preferences",
      isActive: location.pathname === "/settings/preferences",
    },
    {
      icon: statsChartOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.progress"}
          defaultMessage={"Progress"}
          description={"Progress label for side menu on settings page"}
        />
      ),
      to: "/settings/progress",
      isActive: location.pathname === "/settings/progress",
    },
    {
      icon: informationCircleOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.about"}
          defaultMessage={"About Bili"}
          description={"About label for side menu on settings page"}
        />
      ),
      to: "https://bilingualgeneration.com/bili/",
    },
  ];

  return (
    <div id="settings-side-menu" style={{ height: "100%" }}>
      <IonList
        lines="none"
        style={{ height: "100%", padding: "1rem" }}
        className="side-menu-styles"
      >
        {options.map((option, index) => (
          <SideMenuOption key={index} {...option} />
        ))}

        <div
          onClick={() => {
            auth.signOut();
          }}
        >
          <SideMenuOption
            icon={logOutOutline}
            label={
              <FormattedMessage
                id={"common.logOut"}
                defaultMessage={"Log out"}
                description={"Label to log out"}
              />
            }
          />
        </div>

        <IonItem
          className="hover-highlight"
          style={{ position: "absolute", bottom: 0 }}
          onClick={resetTutorial}
        >
          <IonLabel className="menu-label">reset tutorial</IonLabel>
        </IonItem>
      </IonList>
    </div>
  );
};
