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

export const SideMenu: React.FC = () => {
  return (
    <>
      <IonList lines="none">
        <IonItem>
          <IonButton className="arrow-back-btn">
            <IonIcon className="arrow-back-icon" icon={arrowBackOutline} />
          </IonButton>
        </IonItem>

        <div className="side-menu-options">
          <IonItem>
            <SideMenuOption
              icon={gridOutline}
              id={"sideMenu.overview"}
              defaultMessage={"Overview"}
              description={"Overview label for side menu on settings page"}
            />
          </IonItem>

          <IonItem>
            <SideMenuOption
              icon={personOutline}
              id={"sideMenu.profile"}
              defaultMessage={"Profile"}
              description={"Profile label for side menu on settings page"}
            />
          </IonItem>

          <IonItem>
            <SideMenuOption
              icon={optionsOutline}
              id={"sideMenu.preferences"}
              defaultMessage={"Preferences"}
              description={"Preferences label for side menu on settings page"}
            />
          </IonItem>

          <IonItem>
            <SideMenuOption
              icon={statsChartOutline}
              id={"sideMenu.progress"}
              defaultMessage={"Progress"}
              description={"Progress label for side menu on settings page"}
            />
          </IonItem>

          <IonItem>
            <SideMenuOption
              icon={informationCircleOutline}
              id={"sideMenu.about"}
              defaultMessage={"About"}
              description={"About label for side menu on settings page"}
            />
          </IonItem>

          <IonItem>
            <SideMenuOption
              icon={logOutOutline}
              id={"common.logOut"}
              defaultMessage={"Log out"}
              description={"Log out label for side menu on settings page"}
            />
          </IonItem>
        </div>
      </IonList>
    </>
  );
};
