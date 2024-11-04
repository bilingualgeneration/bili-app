import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_in_tshirt.png";

import audio_en from "@/assets/audio/AffirmationsAudio/intro_en.wav";
import audio_es from "@/assets/audio/AffirmationsAudio/intro_es.wav";
import audio_es_inc from "@/assets/audio/AffirmationsAudio/intro_es_inc.wav";

export const AffirmationsIntro: React.FC = () => {
  const { language } = useLanguage();
  const {
    profile: { isInclusive },
  } = useProfile();
  const history = useHistory();
  const en = 'Welcome to "Affirmations"!';
  const es = '¡Bienvenidos a "Afirmaciones"!';
  const esinc = '¡Bienvenides a "Afirmaciones"!';
  let audios = [];
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
    <DialogueScreen
      audios={audios}
      buttonTextPrimary={language === "en" ? button_en : button_es}
      buttonTextSecondary={language === "esen" ? button_en : undefined}
      characterImage={bili}
      onButtonClick={() => {
        history.push("/affirmations/select");
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
  );
};
