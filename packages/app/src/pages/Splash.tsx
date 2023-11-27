import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";

export const Splash: React.FC = () => {
  return (
    <>
      <IonText>
        <h1 className="ion-text-center">
          <FormattedMessage id="splash.loginButton" defaultMessage="Login" />
        </h1>
      </IonText>
      <IonCard>
        <IonCardContent>
          <IonCardTitle className="ion-padding-bottom">
            <FormattedMessage
              id="splash.account"
              defaultMessage="Already have a Bili account?"
            />
          </IonCardTitle>
          <IonButton
            className="ion-margin-top"
            expand="block"
            href="/login"
            shape="round"
          >
            <FormattedMessage id="splash.loginButton" defaultMessage="Login" />
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardContent>
          <IonCardTitle className="ion-padding-bottom">
            <FormattedMessage
              id="splash.newAccount"
              defaultMessage="New to Bili?"
            />
          </IonCardTitle>
          <IonButton
            className="ion-margin-top"
            expand="block"
            fill="outline"
            href="/sign-up"
            shape="round"
          >
            <FormattedMessage
              id="splash.createAccountButton"
              defaultMessage="Create an account"
            />
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardContent>
          <IonCardTitle className="ion-padding-bottom">
            <FormattedMessage
              id="splash.classroom"
              defaultMessage="Do you have a classroom code?"
            />
          </IonCardTitle>
          <IonButton
            className="ion-margin-top"
            color="secondary"
            disabled
            expand="block"
            fill="outline"
            href="/classroom-code"
            shape="round"
          >
            <FormattedMessage
              id="splash.studentLoginButton"
              defaultMessage="Student login"
            />
          </IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};
