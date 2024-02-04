import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";

export const CongratsPage = () => {
  // Function to render the congrats page
  const congrats = {
    background:
      "https://ik.imagekit.io/jskeetedev/Untitled%20design%20(3).png?updatedAt=1706831646016",
    star: "https://ik.imagekit.io/jskeetedev/Untitled%20design%20(2).png?updatedAt=1706831320447",
    es: "Te ganaste una estrella",
    en: "You've earned a star",
  };

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
              zIndex: 1,
            }}
            alt="background"
          />
          <IonText>
            <h1>Actividad Completada</h1>
            <p style={{ textAlign: "center" }}>Activity Completed</p>
          </IonText>

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
                <p style={{ fontSize: "26px", margin: 0, color: "black" }}>
                  {congrats.es}
                </p>
                <p style={{ fontSize: "12px", margin: 0, color: "black" }}>
                  {congrats.en}
                </p>
              </div>
            )}
          </div>

          <IonButton shape="round" style={{ width: "300px" }}>
            ¡Sigue adelante!
            <br />
            Keep Going!
          </IonButton>
        </div>
      </div>
    </>
  );
};
