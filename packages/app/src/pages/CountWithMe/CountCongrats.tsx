import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useProfile } from "@/contexts/ProfileContext";
import { FormattedMessage } from "react-intl";
import "../StoryFactory/StoryFactory.scss";

interface CountCongratsProps {
  onKeepGoingClick: () => void;
}

export const CongratsPage: React.FC<CountCongratsProps> = ({
  onKeepGoingClick,
}) => {
  // Function to render the congrats page
  const congrats = {
    background:
      "https://ik.imagekit.io/jskeetedev/Untitled%20design%20(3).png?updatedAt=1706831646016",
    star: "https://ik.imagekit.io/jskeetedev/Untitled%20design%20(2).png?updatedAt=1706831320447",
  };

  const { isInclusive, isImmersive } = useProfile();
  const [showText, setShowText] = useState(true); // State to show/hide text

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, 2000); // Set timeout to hide text after 2 seconds

    return () => clearTimeout(timeout);
  }, []); // This effect runs only once

  return (
    <>
      <div style={{ padding: "50px" }}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={congrats.background}
            style={{
              position: "absolute",
              width: "1200px",
              height: "auto",
              zIndex: -1,
            }}
            alt="background"
          />
          <div>
            <FormattedMessage
              id="countWIthMe.complete"
              defaultMessage="Activity Completed"
              description="Information that the activity is completed"
            />
            {!isImmersive && (
              <p style={{ textAlign: "center" }}>Activity Completed</p>
            )}
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
            }}
          >
            <img
              src={congrats.star}
              alt="star"
              style={{
                width: showText ? "700px" : "200px",
                height: "auto",
                position: "relative",
                transition: "width 1s ease", // transition effect to animate star shrink
              }}
            />
            {showText && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)", // Center text horizontally and vertically in the star
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    fontSize: "26px",
                    margin: 0,
                    color: "black",
                  }}
                >
                  <FormattedMessage
                    id="countWIthMe.congrats"
                    defaultMessage="You've earned a star"
                    description="Congrats text on a star"
                  />
                </div>

                {!isImmersive && (
                  <p style={{ fontSize: "12px", margin: 0, color: "black" }}>
                    You've earned a star
                  </p>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              position: "relative",
              textAlign: "center",
              marginTop: "10rem",
            }}
          >
            <img
              src={StoryFactoryArrow}
              alt="indicator arrow to next button"
              style={{
                right: "110%",
                top: 3,
                position: "absolute",
              }}
            />

            <IonButton
              className="sf-intro-button"
              //disabled={!audioPlayed}
              expand="block"
              shape="round"
              type="button"
              onClick={onKeepGoingClick}
            >
              <div>
                <div className="story-button-bold">
                  <FormattedMessage
                    id="countWIthMe.keepGoing"
                    defaultMessage="Keep Going!"
                    description="Button label to exit congrats screen"
                  />
                </div>
                {!isImmersive && (
                  <div className="story-button-reg">Keep going!</div>
                )}
              </div>
            </IonButton>
          </div>
        </div>
      </div>
    </>
  );
};
