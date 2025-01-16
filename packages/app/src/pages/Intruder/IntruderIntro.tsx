import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_in_tshirt.png";

import audio_en from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";

export const IntruderIntro: React.FC = () => {
  const { language } = useLanguage();
  const {
    profile: { isInclusive },
  } = useProfile();
  const history = useHistory();
  const en = 'Welcome to "The Intruder"!';
  const es = '¡Bienvenidos a "El intruso"!';
  const esinc = '¡Bienvenides a "El intruso"!';
  let audios: any[] = [];
  switch (language) {
    case "es":
      if (isInclusive) {
        audios = [audio_es_inc];
      } else {
        audios = [audio_es];
      }
      break;
    case "en":
      audios = [audio_en];
      break;
    case "esen":
      if (isInclusive) {
        audios = [audio_es_inc, audio_en];
      } else {
        audios = [audio_es, audio_en];
      }
      break;
  }

  const button_es = "¡Juguemos!";
  const button_en = `Let's play!`;
  return (
    <div className="responsive-height-with-header">
      <DialogueScreen
        audios={audios}
        buttonTextPrimary={language === "en" ? button_en : button_es}
        buttonTextSecondary={language === "esen" ? button_en : undefined}
        characterImage={bili}
        onButtonClick={() => {
          history.push("/intruder-game/select");
        }}
      >
        <IonText>
          <h1 className="text-5xl color-suelo">
            {language === "en" ? en : isInclusive ? esinc : es}
          </h1>
          {language === "esen" && (
            <h2 className="text-3xl color-english">{en}</h2>
          )}
        </IonText>
      </DialogueScreen>
    </div>
  );
};
