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
import { I18nMessage } from "@/components/I18nMessage";

const audio_raw = [
  {
    language: "en",
    audio: audio_en_1,
  },
  {
    language: "es",
    audio: audio_es_1,
  },
  {
    language: "es-inc",
    audio: audio_es_inc_1,
  },
];

export const StoryFactoryIntro: React.FC = () => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const history = useHistory();
  const { populateText } = useLanguage();
  const audios: string[] = populateText(audio_raw).map((a: any) => a.audio);

  const en = 'Welcome to the "Story Factory"!';
  const es = '¡Bienvenidos a la "Fábrica de cuentos"!';
  const esinc = '¡Bienvenides a la "Fábrica de cuentos"!';

  return (
    <div className="responsive-height-with-header">
      <DialogueScreen
        audios={audios}
        buttonI18nKey={"common.letsPlay"}
        characterImage={bili}
        onButtonClick={() => {
          history.push("/story-factory/select");
        }}
      >
        <IonText>
          <h1 className="text-5xl color-suelo">
            <I18nMessage id="storyFactory.welcome" />
          </h1>
          <I18nMessage
            id="storyFactory.welcome"
            level={2}
            wrapper={(t: string) => (
              <p className="text-3xl color-english">{t}</p>
            )}
          />
        </IonText>
      </DialogueScreen>
    </div>
  );
};
