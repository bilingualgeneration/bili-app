import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useReqdActions } from "@/contexts/ReqdActionsContext";
import { FormattedMessage } from "react-intl";
import Joyride from "react-joyride";

import React from "react";
import Home from "@/assets/icons/menu_home.svg?react";
import Discovery from "@/assets/icons/menu_discovery.svg?react";
import Profile from "@/assets/icons/menu_profile.svg?react";
import Heart from "@/assets/icons/menu_heart.svg?react";
import Eclipse from "@/assets/icons/menu_eclipse.svg?react";

export const FooterMenu: React.FC = ({}) => {
  const { reqdActions, setReqdActions } = useReqdActions();
  return (
    <>
      <div style={{ position: "fixed", left: "calc(50% - 175px)", bottom: 0, zIndex: 999}}>
        <IonGrid
          fixed={true}
          style={{
            maxWidth: "350px",
            background: "white",
            borderRadius: "38.563px 38.563px 0px 0px",
            filter: "drop-shadow(0 0px 32px rgba(101, 44, 12, 0.1))",
            textAlign: "center",
          }}
        >
          <IonRow className="ion-align-items-center">
            <IonCol>
              <Heart />
            </IonCol>
            <IonCol style={{ height: "55px" }}>
              <Link to="/student-dashboard">
                <Home
                  style={{
                    background: "white",
                    borderRadius: "50% 50% 0 0",
                    padding: "20px 20px 0 20px",
                    height: "55px",
                    boxSizing: "content-box",
                    position: "relative",
                    top: "-35px",
                  }}
                />
              </Link>
            </IonCol>
            <IonCol id="footer_settings_button">
              <Link to="/settings/overview">
                <Profile />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      {reqdActions.showSettingsMessage && false && (
        <Joyride
          locale={{
            close: (
              <FormattedMessage
                id="joyride.close"
                defaultMessage="Close"
                description="Button label to close Joyride"
              />
            ),
          }}
          callback={(data) => {
            if (data.action === "close") {
              const { showSettingsMessage, ...remainingReqdActions } =
                reqdActions;
              setReqdActions(remainingReqdActions);
            }
          }}
          steps={[
            {
              target: "#footer_settings_button",
              disableBeacon: true,
              content: (
                <FormattedMessage
                  defaultMessage="Click here to customize your child's learning experience"
                  description="Message informing user that they need to go to the settings page to complete their profile"
                  id="reqdActions.goto_settings.message"
                />
              ),
            },
          ]}
        />
      )}
    </>
  );
};
