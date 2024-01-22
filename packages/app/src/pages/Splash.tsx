import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { UnauthedHeader } from "@/components/UnauthedHeader";

export const Splash: React.FC = () => {
  return (
    <>
      <UnauthedHeader showBackButton={false} />
      <div className="content-wrapper">
        <IonText>
          <h2 className="ion-text-center">
            <FormattedMessage
              id="splash.loginTitle"
              defaultMessage="Login"
              description="Title that says 'Login' on Splash page where user can either log in if they have a Bili account or create an account if they are new users"
            />
          </h2>
        </IonText>
        <IonCard>
          <IonCardContent>
            <IonCardTitle className="ion-padding-bottom">
              <FormattedMessage
                id="common.haveAccount"
                defaultMessage="Already have an account?"
                description="link text if user already has an account"
              />
            </IonCardTitle>
            <IonButton
              className="ion-margin-top"
              expand="block"
              href="/login"
              shape="round"
            >
              <FormattedMessage
                id="common.logIn"
                defaultMessage="Log In"
                description="label to log in"
              />
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
      </div>
    </>
  );
};
