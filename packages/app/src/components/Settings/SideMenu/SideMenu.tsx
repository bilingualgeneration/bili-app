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
import "./SideMenu.scss";
import { SideMenuOption } from "./SideMenuOption";
import { useLocation } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
import { useIntl } from "react-intl";

export const SideMenu: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();

  // todo: remove this button and functionality; it's only here for dev purposes
  const resetTutorial = async () => {
    Preferences.remove({ key: "shouldShowSettingsTutorial" });
  };

  const intl = useIntl();

  return (
    <div id="settings-side-menu" style={{ height: "100%" }}>
      <IonList
        lines="none"
        style={{ height: "100%", padding: "1rem" }}
        className="side-menu-styles"
      >
        <SideMenuOption
          icon={gridOutline}
          content={intl.formatMessage({
            id: "sideMenu.overview",
            defaultMessage: "Overview",
            description: "Overview label for side menu on settings page",
          })}
          to="/settings/overview"
          isActive={location.pathname === "/settings/overview"}
        />

        <SideMenuOption
          icon={personOutline}
          content={intl.formatMessage({
            id: "sideMenu.profile",
            defaultMessage: "Profile",
            description: "Profile label for side menu on settings page",
          })}
          to="/settings/profile"
          isActive={location.pathname === "/settings/profile"}
        />

        <SideMenuOption
          icon={optionsOutline}
          content={intl.formatMessage({
            id: "sideMenu.preferences",
            defaultMessage: "Preferences",
            description: "Preferences label for side menu on settings page",
          })}
          to="/settings/preferences"
          isActive={location.pathname === "/settings/preferences"}
        />

        <SideMenuOption
          icon={statsChartOutline}
          content={intl.formatMessage({
            id: "sideMenu.progress",
            defaultMessage: "Progress",
            description: "Progress label for side menu on settings page",
          })}
          to="/settings/progress"
          isActive={location.pathname === "/settings/progress"}
        />

        <SideMenuOption
          icon={informationCircleOutline}
          content={intl.formatMessage({
            id: "sideMenu.about",
            defaultMessage: "About",
            description: "About label for side menu on settings page",
          })}
          to={"https://bilingualgeneration.com/bili/"}
        />

        <div
          onClick={() => {
            auth.signOut();
          }}
        >
          <SideMenuOption
            icon={logOutOutline}
            content={intl.formatMessage({
              id: "common.logOut",
              defaultMessage: "Log out",
              description: "Log out label for side menu on settings page",
            })}
            to="/splash"
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
