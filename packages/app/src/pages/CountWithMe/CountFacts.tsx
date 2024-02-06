import { useProfile } from "@/contexts/ProfileContext";
import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./countWithMe.scss";
// interface Animal {
//   url: string;
//   x: number;
//   y: number;
//   rotation: number;
// }

// interface Prompt {
//   language: string;
//   text: string;
// }

// interface DataItem {
//   prompt: Prompt[];
//   image: string;
//   animals: Animal[];
//   fact: Prompt[];
//   map: string;
// }

interface FactsPageProps {
  factText: any[]; // Adjust the type according to what factText actually contains
  factBackground: string;
}

export const FactsPage: React.FC<FactsPageProps> = ({
  factText,
  factBackground,
}) => {
  const { isImmersive } = useProfile();
  // Function to render the facts page for each animal
  return (
    <>
      <div
        style={{
          backgroundColor: "#F7FAF9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            width: "1159px",
            height: "640px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "row", // Use row to align content horizontally
            justifyContent: "center", // Center content horizontally
            alignItems: "stretch", // Align items to stretch vertically
            padding: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start", // Align text content to the left
              padding: "20px",
            }}
          >
            <IonText>
              <h1>{factText[1].text}</h1>
              {!isImmersive && (
                <p className="count-english-text-style">{factText[0].text}</p>
              )}
            </IonText>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end", // Align map image to the right
              padding: "20px",
            }}
          >
            <img
              src={factBackground}
              alt={factText[0].text}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
