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
          <FormattedMessage
            id="splash.loginTitle"
            defaultMessage="Login"
            description="Title that says 'Login' on Splash page where user can either log in if they have a Bili account or create an account if they are new users"
          />
        </h1>
      </IonText>
      <IonCard>
        <IonCardContent>
          <IonCardTitle className="ion-padding-bottom">
            <FormattedMessage
              id="common.haveAccount"
              defaultMessage="Already have a Bili account?"
            />
          </IonCardTitle>
          <IonButton
            className="ion-margin-top"
            expand="block"
            href="/login"
            shape="round"
          >
            <FormattedMessage id="common.login" defaultMessage="Login" />
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
              description="Input area for teachers to enter their classroom code"
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
