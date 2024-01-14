import React, { useState } from "react";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import "./StoryFactory.css";

const words = [
  [
    { es: "La vaca", en: "The cow" },
    { es: "Mi mamá", en: "My Mom" },
    { es: "El sapo", en: "The frog" },
    { es: "Doña María", en: "Doña María" },
  ],
  [
    { es: "nos da", en: "gives" },
    { es: "puso", en: "put" },
    { es: "come", en: "eats" },
    { es: "dibuja", en: "draws" },
  ],
  [
    { es: "leche", en: "milk" },
    { es: "pan dulce", en: "sweet bread" },
    { es: "insectos", en: "insects" },
    { es: "las nubes", en: "the clouds" },
  ],
  [
    { es: "los sábados.", en: "Saturdays" },
    { es: "en la mesa.", en: "on the table." },
    { es: "en el bosque.", en: "in the forest." },
    { es: "en el cielo.", en: "in the sky." },
  ],
];

interface StoryFactoryPage4aProps {
  currentPage: number;
}

export const StoryFactoryPage4a: React.FC<StoryFactoryPage4aProps> = ({
  currentPage,
}) => {
  const { isImmersive } = useProfile();
  const [wordIndices, setWordIndices] = useState([0, 0, 0, 0]);

  const moveArrows = (direction: number) => {
    const newIndices = wordIndices.map((index, i) => {
      const newIndex = index + direction;
      const maxIndex = words[i].length - 1;

      // Ensure the index stays within bounds
      return newIndex < 0 ? 0 : newIndex > maxIndex ? maxIndex : newIndex;
    });

    setWordIndices(newIndices);
  };

  return (
    <>
      {/* <div className="sf-background-pattern"> */}
      <div id="sf-game-page">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <div className="sf-colorful-text-heading">
                <span style={{ color: "#006A67" } as any}>¡</span>
                <span style={{ color: "#FF5708" } as any}>F</span>
                <span style={{ color: "#8E84E9" } as any}>á</span>
                <span style={{ color: "#F28AC9" } as any}>b</span>
                <span style={{ color: "#006A67" } as any}>r</span>
                <span style={{ color: "#E3C029" } as any}>i</span>
                <span style={{ color: "#F48722" } as any}>c</span>
                <span style={{ color: "#8E84E9" } as any}>a</span>
                <span> </span>
                <span style={{ color: "#F28AC9" } as any}>d</span>
                <span style={{ color: "#F48722" } as any}>e</span>
                <span> </span>
                <span style={{ color: "#E3C029" } as any}>c</span>
                <span style={{ color: "#006A67" } as any}>u</span>
                <span style={{ color: "#FF5708" } as any}>e</span>
                <span style={{ color: "#8E84E9" } as any}>n</span>
                <span style={{ color: "#F28AC9" } as any}>t</span>
                <span style={{ color: "#006A67" } as any}>o</span>
                <span style={{ color: "#E3C029" } as any}>s</span>
                <span style={{ color: "#FF5708" } as any}>!</span>
              </div>
            </IonCol>
          </IonRow>
          {/* <div className="bubble-background" id='sf-colorful-text-container'></div> */}

          {/* Row for upward arrows */}
          <IonRow>
            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M24.9332 1.61877C26.3424 0.181033 28.6576 0.181035 30.0668 1.61878L53.1212 25.14C55.3504 27.4144 53.7391 31.25 50.5544 31.25L4.44562 31.25C1.26091 31.25 -0.35043 27.4144 1.87882 25.14L24.9332 1.61877Z"
                  fill="#C25808"
                />
              </svg>
            </IonCol>

            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M24.9332 1.61877C26.3424 0.181033 28.6576 0.181035 30.0668 1.61878L53.1212 25.14C55.3504 27.4144 53.7391 31.25 50.5544 31.25L4.44562 31.25C1.26091 31.25 -0.35043 27.4144 1.87882 25.14L24.9332 1.61877Z"
                  fill="#006A67"
                />
              </svg>
            </IonCol>

            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M24.9332 1.61877C26.3424 0.181033 28.6576 0.181035 30.0668 1.61878L53.1212 25.14C55.3504 27.4144 53.7391 31.25 50.5544 31.25L4.44562 31.25C1.26091 31.25 -0.35043 27.4144 1.87882 25.14L24.9332 1.61877Z"
                  fill="#CAA900"
                />
              </svg>
            </IonCol>

            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M24.9332 1.61877C26.3424 0.181033 28.6576 0.181035 30.0668 1.61878L53.1212 25.14C55.3504 27.4144 53.7391 31.25 50.5544 31.25L4.44562 31.25C1.26091 31.25 -0.35043 27.4144 1.87882 25.14L24.9332 1.61877Z"
                  fill="#8E84E9"
                />
              </svg>
            </IonCol>
          </IonRow>

          {/* Row for ovals w/ words */}
          <IonRow class="ion-justify-content-center">
            <IonCol>
              <div className="sf-game-option-1 option-orange">
                <div></div>
              </div>
            </IonCol>

            <IonCol>
              <div className="sf-game-option-1 option-blue">
                <div></div>
              </div>
            </IonCol>

            <IonCol>
              <div className="sf-game-option-1 option-yellow">
                <div></div>
              </div>
            </IonCol>

            <IonCol>
              <div className="sf-game-option-1 option-purple">
                <div></div>
              </div>
            </IonCol>
          </IonRow>

          {/* Row for downward arrows */}
          <IonRow>
            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M30.0668 30.5062C28.6576 31.944 26.3424 31.944 24.9332 30.5062L1.87882 6.98501C-0.35043 4.71062 1.26091 0.875 4.44562 0.875L50.5544 0.875003C53.7391 0.875003 55.3504 4.71063 53.1212 6.98502L30.0668 30.5062Z"
                  fill="#C25808"
                />
              </svg>
            </IonCol>

            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M30.0668 30.5062C28.6576 31.944 26.3424 31.944 24.9332 30.5062L1.87882 6.98501C-0.35043 4.71062 1.26091 0.875 4.44562 0.875L50.5544 0.875003C53.7391 0.875003 55.3504 4.71063 53.1212 6.98502L30.0668 30.5062Z"
                  fill="#006A67"
                />
              </svg>
            </IonCol>

            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M30.0668 30.5062C28.6576 31.944 26.3424 31.944 24.9332 30.5062L1.87882 6.98501C-0.35043 4.71062 1.26091 0.875 4.44562 0.875L50.5544 0.875003C53.7391 0.875003 55.3504 4.71063 53.1212 6.98502L30.0668 30.5062Z"
                  fill="#CAA900"
                />
              </svg>
            </IonCol>

            <IonCol>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="32"
                viewBox="0 0 55 32"
                fill="none"
              >
                <path
                  d="M30.0668 30.5062C28.6576 31.944 26.3424 31.944 24.9332 30.5062L1.87882 6.98501C-0.35043 4.71062 1.26091 0.875 4.44562 0.875L50.5544 0.875003C53.7391 0.875003 55.3504 4.71063 53.1212 6.98502L30.0668 30.5062Z"
                  fill="#8E84E9"
                />
              </svg>
            </IonCol>
          </IonRow>

          {/* Row for volume/speaker */}
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-no-padding">
              <div className="volume-button-background">
                <img className="volume-icon" src={volumeButton} />
              </div>
            </IonCol>
          </IonRow>

          {/* Row for volume/speaker text */}
          <IonRow>
            <IonCol className="ion-no-padding">
              <div>
                <h2>
                  <FormattedMessage
                    id="storyFactory.read"
                    defaultMessage="Read"
                    description="Story Factory volume/play button that says 'Read'"
                  />
                </h2>
                {!isImmersive && <p>Read</p>}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
