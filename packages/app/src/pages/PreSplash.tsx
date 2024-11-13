import Logo from "@/assets/icons/bili_logo.svg?react";
import { IonButton, IonContent, IonImg, IonText, IonPage } from "@ionic/react";
import "./PreSplash.css";
import Bili from "@/assets/icons/bili_big_avatar.svg?react";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";

import { I18nMessage } from "@/components/I18nMessage";

export const PreSplash: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div id="start-page">
          <div className="page-wrapper" style={{ paddingBottom: 0 }}>
            <div
              id="inner-start-page"
              style={{ paddingTop: "3rem", paddingBottom: "2rem" }}
            >
              <Logo />
              <IonText>
                <p
                  className="text-2xl color-nube semibold"
                  style={{ marginTop: "0.5rem" }}
                >
                  <I18nMessage
                    id="presplash.tagline"
                    languageSource="unauthed"
                  />
                </p>
              </IonText>
              <Bili style={{ margin: "3rem 0" }} />
              <IonText>
                <p className="text-lg color-cielo-highest semibold">
                  <I18nMessage id="presplash.tryit" languageSource="unauthed" />
                </p>
              </IonText>
              <div style={{ width: 400 }}>
                <IonButton
                  className="margin-top-2 margin-bottom-1"
                  routerLink="/splash"
                  expand="full"
                  shape="round"
                >
                  <I18nMessage
                    id="presplash.getStarted"
                    languageSource="unauthed"
                  />
                </IonButton>
              </div>
              <IonText>
                <p className="text-sm color-cielo-highest">
                  <I18nMessage
                    id="presplash.noCommitments"
                    languageSource="unauthed"
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
