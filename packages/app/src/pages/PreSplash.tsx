import React from "react";
import Logo from "@/assets/icons/bili_logo.svg?react";
import { IonButton, IonImg, IonText } from "@ionic/react";
import "./PreSplash.css";
import Bili from "@/assets/icons/bili_big_avatar.svg?react";
export const PreSplash: React.FC = () => {
  return (
    <>
      <div className="start-page">
        <div className="inner-start-page">
          <Logo />
          <IonText>
            <p className="bigger-size-paragraph">
              Language learning that is abueltia–
              <br />
              and science–approved
            </p>
          </IonText>
          <Bili />
          <IonText>
            <p>Try it all for FREE</p>
          </IonText>
          <IonButton routerLink="/sign-up" expand="full" shape="round">
            <span className="button-text">Let's get started</span>
          </IonButton>
          <IonText>
            <p style={{ fontSize: "0.8rem" }}>
              No commitments, cancel anytime.
            </p>
          </IonText>
        </div>
      </div>
    </>
  );
};
