import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { UnauthedHeader } from "@/components/UnauthedHeader";

export const Splash: React.FC = () => {
  const titleClasses: string =
    "ion-text-center text-xl semibold margin-bottom-2";
  return (
    <>
      <UnauthedHeader showBackButton={false} />
      <div className="content-wrapper">
        <div style={{ maxWidth: 580, margin: "auto" }}>
          <IonText>
            <h2 className="ion-text-center text-3xl semibold margin-bottom-2">
              <FormattedMessage
                id="splash.loginTitle"
                defaultMessage="Login"
                description="Title that says 'Login' on Splash page where user can either log in if they have a Bili account or create an account if they are new users"
              />
            </h2>
          </IonText>
          <IonCard>
            <IonCardContent>
              <IonCardTitle className={titleClasses}>
                <FormattedMessage
                  id="common.haveAccount"
                  defaultMessage="Already have an account?"
                  description="link text if user already has an account"
                />
              </IonCardTitle>
              <Link to='/login' className='no-underline'>
                <IonButton
                  className=""
                  expand="block"
                  shape="round"
                >
                  <FormattedMessage
                    id="common.logIn"
                    defaultMessage="Log In"
                    description="label to log in"
                  />
                </IonButton>
              </Link>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonCardTitle className={titleClasses}>
                <FormattedMessage
                  id="splash.newAccount"
                  defaultMessage="New to Bili?"
                />
              </IonCardTitle>
              <Link to='/sign-up' className='no-underline'>
                <IonButton
                  expand="block"
                  fill="outline"
                  shape="round">
                  <FormattedMessage
                    id="splash.createAccountButton"
                    defaultMessage="Create an account"
                  />
                </IonButton>
              </Link>
            </IonCardContent>
          </IonCard>


          <IonCard>
            <IonCardContent>
              <IonCardTitle className={titleClasses}>
                <FormattedMessage
                  id="splash.classCode"
                  defaultMessage="Do you have a classroom code?"
                />
              </IonCardTitle>
              <Link to='/sign-up/class-code' className='no-underline'>
                <IonButton
                  expand="block"
                  fill="outline"
                  shape="round">
                  <FormattedMessage
                    id="splash.classCodeButton"
                    defaultMessage="Student login"
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
