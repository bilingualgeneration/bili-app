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

import React from "react";
import Home from "@/assets/icons/menu_home.svg?react";
import Discovery from "@/assets/icons/menu_discovery.svg?react";
import Profile from "@/assets/icons/menu_profile.svg?react";
import Eclipse from "@/assets/icons/menu_eclipse.svg?react";

export const FooterMenu: React.FC = ({}) => {
  return (
    <>
      <div>
        <IonGrid
          fixed={true}
          style={{
            maxWidth: "400px",
            marginTop: "50px",
            background: "white",
            borderRadius: "38.563px 38.563px 0px 0px",
            filter: "drop-shadow(0 0px 32px rgba(101, 44, 12, 0.1))",
            textAlign: "center",
          }}
        >
          <IonRow className="ion-align-items-center">
            <IonCol>
              <Link to="/student-dashboard">
                <Home />
              </Link>
            </IonCol>
            <IonCol style={{ height: "55px" }}>
              <Discovery
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
            </IonCol>
            <IonCol>
              <Link to="/settings/overview">
                <Profile />
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
