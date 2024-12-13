import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_in_tshirt.png";

import audio_en from "@/assets/audio/WouldDoAudio/instruction_en.mp3";
import audio_es from "@/assets/audio/WouldDoAudio/instruction_es.mp3";
import audio_es_inc from "@/assets/audio/WouldDoAudio/instruction_es_inc.mp3";

export const WouldDoIntro: React.FC = () => {
  const { language } = useLanguage();
  const {
    profile: { isInclusive },
  } = useProfile();
  const history = useHistory();
  const en = 'Welcome to "What Would You Do?"!';
  const es = '¡Bienvenidos a "¿Qué harías?"!';
  const esinc = '¡Bienvenides a "¿Qué harías?"!';
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

  const button_es = "¡Juguemos!";
  const button_en = `Let's play!`;
  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <DialogueScreen
        audios={audios}
        buttonTextPrimary={language === "en" ? button_en : button_es}
        buttonTextSecondary={
          language === "es.en" || language === "en.es" ? button_en : undefined
        }
        characterImage={bili}
        onButtonClick={() => {
          history.push("/would-do/select");
        }}
      >
        <IonText>
          <h1 className="text-5xl color-suelo">
            {language === "en" ? en : es}
          </h1>
          {(language === "es.en" || language === "en.es") && (
            <h2 className="text-3xl color-english">{en}</h2>
          )}
        </IonText>
      </DialogueScreen>
    </div>
  );
};
