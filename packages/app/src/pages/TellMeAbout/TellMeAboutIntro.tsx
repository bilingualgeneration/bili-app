import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_in_tshirt.png";

import audio_en from "@/assets/audio/TellMeAboutAudio/instructions_en.mp3";
import audio_es from "@/assets/audio/TellMeAboutAudio/instructions_es.mp3";

export const TellMeAboutIntro: React.FC = () => {
  const { language } = useLanguage();
  const {
    profile: { isInclusive },
  } = useProfile();
  const history = useHistory();
  const en = 'Welcome to "Tell Me About…"!';
  const es = '¡Bienvenidos a "Cuéntame sobre…"!';
  const esinc = '¡Bienvenides a "Cuéntame sobre…"!';
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
      audios = [audio_es, audio_en];
      break;
  }

  const button_es = "¡Juguemos!";
  const button_en = `Let's play!`;
  return (
    <DialogueScreen
      audios={audios}
      buttonTextPrimary={language === "en" ? button_en : button_es}
      buttonTextSecondary={
        language === "es.en" || language === "en.es" ? button_en : undefined
      }
      characterImage={bili}
      onButtonClick={() => {
        history.push("/tell-me-about/select");
      }}
    >
      <IonText>
        <h1 className="text-5xl color-suelo">{language === "en" ? en : es}</h1>
        {(language === "es.en" || language === "en.es") && (
          <h2 className="text-3xl color-english">{en}</h2>
        )}
      </IonText>
    </DialogueScreen>
  );
};
