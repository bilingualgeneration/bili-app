import React, { useState } from "react";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { SF_Slot } from "@/components/StoryFactory";
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

const colorOptionsArrows = ["#C25808", "#006A67", "#CAA900", "#8E84E9"];
const colorOptionsOvals = [
  "option-orange",
  "option-blue",
  "option-yellow",
  "option-purple",
];

interface StoryFactoryPage4Props {
  es: string;
  currentPage: number;
}

export const StoryFactoryPage4: React.FC<StoryFactoryPage4Props> = ({
  currentPage,
  es,
}) => {
  const { isImmersive } = useProfile();
  const [wordIndices, setWordIndices] = useState([0, 0, 0, 0]);

  const speak = (normalized_key: string, lang: string) => {
    const path: string = `/assets/audio/${normalized_key}_${lang}.mp3`;
    console.log(path);
    const audio = new Audio(path);
    audio.play();
    /*
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.lang = lang;
        window.speechSynthesis.speak(msg);
        */
  };

  const normalize = (s: string): string => {
    return s.toLowerCase().replace(/\s+/g, "_").replace(/\./g, "");
  };

  return (
    <>
      <div id="sf-game-page">
        <div className="sf-background-pattern"></div>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol>
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

          {/* Row for slots/words */}
          <IonRow>
            {wordIndices.map((index, position) => (
              <IonCol>
                <SF_Slot
                  es={words[position][index].es}
                  en={words[position][index].en}
                  {...{ setWordIndices, wordIndices, index, position }}
                  colorOptionsArrows={colorOptionsArrows}
                  colorOptionsOvals={colorOptionsOvals}
                />
              </IonCol>
            ))}
          </IonRow>

          {/* Row for volume/speaker */}
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-no-padding">
              <span
                onClick={() => {
                  speak(normalize(es), "es");
                }}
              ></span>
              <IonButton className="volume-button-background" shape="round">
                <img className="volume-icon" src={volumeButton} />
              </IonButton>
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
