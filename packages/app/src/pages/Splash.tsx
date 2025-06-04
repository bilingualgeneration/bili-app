import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { I18nMessage } from "@/components/I18nMessage";
import { UnauthedHeader } from "@/components/UnauthedHeader";

import loginWithClassLink from "@/assets/img/login_with_classlink.png";

export const Splash: React.FC = () => {
  const titleClasses: string =
    "ion-text-center text-xl semibold margin-bottom-2";
  return (
    <>
      <UnauthedHeader showBackButton={false} />
      <div className="content-wrapper">
        <div style={{ maxWidth: "40rem", margin: "auto" }}>
          <IonText>
            <h2 className="ion-text-center text-3xl semibold margin-bottom-2">
              <I18nMessage id="splash.loginTitle" languageSource="unauthed" />
            </h2>
          </IonText>
          <IonCard>
            <IonCardContent>
              <IonCardTitle className={titleClasses}>
                <I18nMessage
                  id="common.haveAccount"
                  languageSource="unauthed"
                />
              </IonCardTitle>
              <Link to="/login" className="no-underline">
                <IonButton expand="block" shape="round">
                  <I18nMessage id="common.logIn" languageSource="unauthed" />
                </IonButton>
              </Link>
              <div className="ion-text-center">
                <a
                  href={`${
                    import.meta.env.VITE_DIRECTUS_URL
                  }/auth/login/classlink?redirect=${
                    import.meta.env.VITE_PUBLIC_URL
                  }/classlink`}
                >
                  <img src={loginWithClassLink} />
                </a>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonCardTitle className={titleClasses}>
                <I18nMessage id="splash.newAccount" languageSource="unauthed" />
              </IonCardTitle>
              <Link to="/waitlist" className="no-underline">
                <IonButton expand="block" fill="outline" shape="round">
                  <I18nMessage
                    id="splash.joinWaitlist"
                    languageSource="unauthed"
                  />
                </IonButton>
              </Link>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonCardTitle className={titleClasses}>
                <I18nMessage id="splash.classCode" languageSource="unauthed" />
              </IonCardTitle>
              <Link to="/login-with-classroom-code" className="no-underline">
                <IonButton expand="block" fill="outline" shape="round">
                  <I18nMessage
                    id="splash.classCodeButton"
                    languageSource="unauthed"
                  />
                </IonButton>
              </Link>
            </IonCardContent>
          </IonCard>
        </div>
      </div>
    </>
  );
};
