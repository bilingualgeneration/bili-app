import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_letters.png";

import audio_es_1 from "@/assets/audio/StoryFactoryAudio/story_factory_first_es.mp3";
import audio_es_inc_1 from "@/assets/audio/StoryFactoryAudio/story_factory_first_es-inc.mp3";
import audio_en_1 from "@/assets/audio/StoryFactoryAudio/story_factory_first_en.mp3";
import audio_es_2 from "@/assets/audio/StoryFactoryAudio/story_factory_second_es.mp3";
import audio_en_2 from "@/assets/audio/StoryFactoryAudio/story_factory_second_en.mp3";

export const StoryFactoryIntro: React.FC = () => {
  const { language } = useLanguage();
  const history = useHistory();
  const en = 'Welcome to the "Story Factory"!';
  const es = '¡Bienvenidos a la "Fábrica de cuentos"!';
  const esinc = '¡Bienvenides a la "Fábrica de cuentos"!';
  let audios: any[] = [];
  switch (language) {
    case "es":
      audios = [audio_es_1, audio_es_2];
      break;
    case "en":
      audios = [audio_en_1, audio_en_2];
      break;
    case "esen":
      audios = [audio_es_1, audio_es_2, audio_en_1, audio_en_2];
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
        history.push("/story-factory/select");
      }}
    >
      <IonText>
        <h1 className="text-5xl color-suelo">{language === "en" ? en : es}</h1>
        {language === "esen" && (
          <h2 className="text-3xl color-english">{en}</h2>
        )}
      </IonText>
    </DialogueScreen>
  );
};
