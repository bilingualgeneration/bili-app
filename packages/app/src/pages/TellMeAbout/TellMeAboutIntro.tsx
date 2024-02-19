import { IonButton } from "@ionic/react";
import { Intro } from "@/components/Intro";

export const TellMeAboutIntro: React.FC = () => {
  return (
    <Intro
      texts={[
        {
          es: {
            text: "Cuéntame sobre...",
            subtext: `¡Bienvenides al juego, "Cuéntame about..."! El objetivo de este juego es...`,
            audio: ""
          },
          en: {
            text: `Tell me about...`,
            subtext: `Welcome to "Tell me about..." game! The goal of this game is...`,
            audio: ""
          }
        }
      ]}
      image="biliCharacter"
      nextPath="/tell-me-about-game/select"
    />
  );
};
