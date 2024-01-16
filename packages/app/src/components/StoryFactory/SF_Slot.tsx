import React, { useEffect } from "react";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { volumeMedium } from "ionicons/icons";
import { VolumeCard } from "@/components/StoryFactory/VolumeCard";
import polygonUp from "@/assets/icons/polygon_up.svg";
import polygonDown from "@/assets/icons/polygon_down.svg";
import { FormattedMessage } from "react-intl";
import "@/pages/StoryFactory/StoryFactory.css";

import { useProfile } from "@/contexts/ProfileContext";

interface SF_SlotProps {
  es: string;
  en: string;
  wordIndices: number[];
  setWordIndices: any;
  index: number;
  position: number;
  colorOptionsArrows: string[];
  colorOptionsOvals: string[];
}

export const SF_Slot: React.FC<SF_SlotProps> = ({
  es,
  en,
  wordIndices,
  setWordIndices,
  index,
  position,
  colorOptionsArrows,
  colorOptionsOvals,
}) => {
  const { isImmersive } = useProfile();

  // Extract arrow colors and oval color from the arrays
  const arrowColor = colorOptionsArrows[position];
  const ovalColor = colorOptionsOvals[position];

  return (
    <>
      <div
      // style={{
      //     display: "flex",
      //     flexDirection: "column",
      //     alignItems: "center",
      //     width: '100%',
      //     height: '20vh',
      //     gap: '7.17px',
      //     flexShrink: '0',
      //     borderRadius: '200px',
      //     margin: '0px 1% 0px',
      // }}
      >
        <IonGrid class="ion-no-padding">
          {/* Row for upward arrows */}
          <IonRow className="ion-justify-content-center">
            <IonCol>
              {/* <div className="up-button"> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
                onClick={() => {
                  let copy = [...wordIndices];
                  if (index === 3) {
                    copy[position] = 0;
                  } else {
                    copy[position] = index + 1;
                  }
                  setWordIndices(copy);
                }}
              >
                <path
                  d="M24.9332 1.61877C26.3424 0.181033 28.6576 0.181035 30.0668 1.61878L53.1212 25.14C55.3504 27.4144 53.7391 31.25 50.5544 31.25L4.44562 31.25C1.26091 31.25 -0.35043 27.4144 1.87882 25.14L24.9332 1.61877Z"
                  fill={arrowColor} // Dynamically set fill based on array option
                />
              </svg>
              {/* </div> */}
            </IonCol>
          </IonRow>

          {/* Row for ovals w/ words */}
          <IonRow class="ion-justify-content-center">
            <IonCol>
              <div className={`sf-game-option-1 ${ovalColor}`}>
                <h1 className="sf-text1-spanish">{es}</h1>
                {!isImmersive && <p className="sf-text2-english">{en}</p>}
              </div>
            </IonCol>
          </IonRow>

          {/* Row for downward arrows */}
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <div className="down-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="32"
                  viewBox="0 0 55 32"
                  fill="none"
                  onClick={() => {
                    let copy = [...wordIndices];
                    if (index === 0) {
                      copy[position] = 3;
                    } else {
                      copy[position] = index - 1;
                    }
                    setWordIndices(copy);
                  }}
                >
                  <path
                    d="M30.0668 30.5062C28.6576 31.944 26.3424 31.944 24.9332 30.5062L1.87882 6.98501C-0.35043 4.71062 1.26091 0.875 4.44562 0.875L50.5544 0.875003C53.7391 0.875003 55.3504 4.71063 53.1212 6.98502L30.0668 30.5062Z"
                    fill={arrowColor} // Dynamically set fill based on array option
                  />
                </svg>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
