import { FormattedMessage } from "react-intl";
import { IonButton, IonImg, IonSpinner, IonText } from "@ionic/react";
import React, { useEffect } from "react";
import { useSignUpData } from "./SignUpContext";
import { useHistory } from "react-router-dom";
import { useReqdActions } from "@/contexts/ReqdActionsContext";

export const Complete: React.FC = () => {
  const { data, signUp, signUpStatus } = useSignUpData();
  const history = useHistory();
  const { reqdActions, setReqdActions } = useReqdActions();
  useEffect(() => {
    if (signUpStatus === "idle") {
      signUp();
    }
    if (signUpStatus === "done") {
      setReqdActions({
        ...reqdActions,
        showSettingsMessage: true,
      });
    }
  }, [signUpStatus]);
  if (signUpStatus === "idle" || signUpStatus === "busy") {
    return (
      <div className="ion-text-center ion-hide">
        <IonButton onClick={signUp}>trigger</IonButton>
        <IonSpinner />
      </div>
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IonText className="ion-text-center margin-bottom-3">
          <h2 className="text-3xl semibold color-suelo">
            <FormattedMessage
              id="successScreen.success"
              defaultMessage="Success! You did it!"
              description="Message that appears once user has completed registration process"
            />
          </h2>
        </IonText>

        <IonImg src="/assets/img/happy_cactus.png" />
        <IonButton
          className="margin-vertical-3"
          data-testid="complete-continue-button"
          onClick={() => {
            history.push("/student-dashboard");
          }}
          shape="round"
        >
          <FormattedMessage
            id="common.continue"
            defaultMessage="Continue"
            description="Button label to continue"
          />
        </IonButton>
      </div>
    </>
  );
};
