import React from "react";
import { IonButton, IonIcon, IonItem, IonList } from "@ionic/react";
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
import { SideMenuOption } from "./SideMenuOption";
import { useLocation } from "react-router-dom";

export const SideMenu: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonList lines="none" style={{ height: "100vh", padding: "1rem" }}>
        <SideMenuOption
          icon={gridOutline}
          id={"sideMenu.overview"}
          defaultMessage={"Overview"}
          description={"Overview label for side menu on settings page"}
          to="/settings/overview"
          isActive={location.pathname === "/settings/overview"}
        />

        <SideMenuOption
          icon={personOutline}
          id={"sideMenu.profile"}
          defaultMessage={"Profile"}
          description={"Profile label for side menu on settings page"}
          to="/settings/profile"
          isActive={location.pathname === "/settings/profile"}
        />

        <SideMenuOption
          icon={optionsOutline}
          id={"sideMenu.preferences"}
          defaultMessage={"Preferences"}
          description={"Preferences label for side menu on settings page"}
          to="/settings/preferences"
          isActive={location.pathname === "/settings/preferences"}
        />

        <SideMenuOption
          icon={statsChartOutline}
          id={"sideMenu.progress"}
          defaultMessage={"Progress"}
          description={"Progress label for side menu on settings page"}
          to="/settings/progress"
          isActive={location.pathname === "/settings/progress"}
        />

        <SideMenuOption
          icon={informationCircleOutline}
          id={"sideMenu.about"}
          defaultMessage={"About"}
          description={"About label for side menu on settings page"}
        />

        <SideMenuOption
          icon={logOutOutline}
          id={"common.logOut"}
          defaultMessage={"Log out"}
          description={"Log out label for side menu on settings page"}
        />
      </IonList>
    </>
  );
};
