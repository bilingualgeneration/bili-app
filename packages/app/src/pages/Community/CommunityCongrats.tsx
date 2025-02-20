import { DialogueScreen } from "@/components/DialogueScreen";
import { I18nMessage } from "@/components/I18nMessage";
import { useLanguage } from "@/hooks/Language";
import { IonText } from "@ionic/react";
import { useCardSlider } from "@/contexts/CardSlider";
import { useHistory } from "react-router";

import biliCharacter from "@/assets/icons/bili_character.svg";
import FlowerImage from "@/assets/icons/big_flower.svg";

import audio_en from "@/assets/audio/FlowerCongrats/way_to_grow.mp3";
import audio_es from "@/assets/audio/FlowerCongrats/estás_creciendo_mucho.mp3";

export const CommunityCongrats: React.FC = () => {
  const { language } = useLanguage();
  const { activity, packId } = useCardSlider();
  const history = useHistory();
  let audios: any[] = [];
  switch (language) {
    case "es":
      audios = [audio_es];
      break;
    case "en":
      audios = [audio_en];
      break;
    case "es.en":
      audios = [audio_es, audio_en];
      break;
    case "en.es":
      audios = [audio_en, audio_es];
      break;
  }

  const button_es = "¡Sigue adelante!";
  const button_en = "Keep going!";

  return (
    <div className="responsive-height-with-header">
      <DialogueScreen
        audios={audios}
        buttonTextPrimary={language === "en" ? button_en : button_es}
        buttonTextSecondary={
          language === "es.en" || language === "en.es" ? button_en : ""
        }
        characterImage={biliCharacter}
        onButtonClick={() => {
          history.push(`/${activity}/play/${packId}`);
        }}
      >
        <IonText class="ion-text-center">
          <div>
            <img src={FlowerImage} alt="flower" style={{ height: "10rem" }} />
          </div>
          <h1 className="text-5xl color-suelo">
            <I18nMessage id="common.congrats.flower" />
          </h1>
          <I18nMessage
            id="common.congrats.flower"
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-4xl color-grey">{text}</h2>
            )}
          />
        </IonText>
      </DialogueScreen>
    </div>
  );
};
