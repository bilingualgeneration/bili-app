import { FormattedMessage } from "react-intl";
import { IonButton, IonImg, IonSpinner, IonText } from "@ionic/react";
import React, { useEffect } from "react";
import { useSignUpData } from "./SignUpContext";
import { useSwiper } from "swiper/react";

export const Complete: React.FC = () => {
  const swiper = useSwiper();
  const { data, signUp, signUpStatus } = useSignUpData();
  useEffect(() => {
    if (
      signUpStatus === "idle" &&
      swiper.activeIndex === swiper.slides?.length - 1
    ) {
      signUp();
    }
  }, [signUpStatus, swiper.activeIndex, swiper.slides?.length]);
  if (signUpStatus === "idle" || signUpStatus === "busy") {
    return <IonSpinner />;
  }
  console.log(data);
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
