import { FormattedMessage } from "react-intl";
import { IonButton, IonImg, IonSpinner, IonText } from "@ionic/react";
import React, { useEffect } from "react";
import { useSignUpData } from "./SignUpContext";

export const Complete: React.FC = () => {
  const { data, signUp, signUpStatus } = useSignUpData();
  useEffect(() => {
    if (signUpStatus === "idle") {
      signUp();
    }
  }, [signUpStatus]);
  if (signUpStatus === "idle" || signUpStatus === "busy") {
    return <IonSpinner />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IonText className="ion-text-center">
          <h1>
            <FormattedMessage
              id="successScreen.success"
              defaultMessage="Success! You did it!"
              description="Message that appears once user has completed registration process"
            />
          </h1>
        </IonText>

        <IonImg src="/assets/img/happy_cactus.png" />
        <IonButton
          data-testid="complete-continue-button"
          href="/student-dashboard"
          shape="round"
          style={{
            marginTop: "24px",
          }}
          type="submit"
        >
          <FormattedMessage
            id="common.continue"
            defaultMessage="Continue"
            description="Button for users to continue on to the next page"
          />
        </IonButton>
      </div>
    </>
  );
};
