import React from "react";
import Logo from "@/assets/img/bili_logo.png";
import { IonButton, IonContent, IonImg, IonText, IonPage } from "@ionic/react";
import "./PreSplash.scss";
import Bili from "@/assets/img/bili_presplash_avatar.png";
import { FormattedMessage } from "react-intl";

export const PreSplash: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div id="start-page">
          <div className="page-wrapper">
            <div id="inner-start-page">
              <IonImg src={Logo} style={{ width: 150, height: "auto" }} />
              <IonText>
                <p
                  className="text-2xl color-nube semibold"
                  style={{ marginTop: "0.5rem" }}
                >
                  <FormattedMessage
                    id="presplash.tagline"
                    defaultMessage="Language learning that is abuelita and science–approved"
                  />
                </p>
              </IonText>
              <IonImg
                src={Bili}
                style={{ margin: "3rem 0", width: 500, height: "auto" }}
              />
              <IonText>
                <p className="text-lg color-cielo-highest semibold">
                  <FormattedMessage
                    id="presplash.tryit"
                    defaultMessage="Try it all for FREE"
                  />
                </p>
              </IonText>
              <IonButton
                routerLink="/splash"
                expand="full"
                shape="round"
                style={{ width: 400, marginTop: "2rem", marginBottom: "1rem" }}
              >
                <FormattedMessage
                  id="presplash.getStarted"
                  defaultMessage="Let's get started"
                />
              </IonButton>
              <IonText>
                <p className="text-sm color-cielo-highest">
                  <FormattedMessage
                    id="presplash.noCommitments"
                    defaultMessage="No commitments, cancel anytime."
                  />
                </p>
              </IonText>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
