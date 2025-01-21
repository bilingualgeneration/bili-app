import { DialogueScreen } from "@/components/DialogueScreen";
import { I18nMessage } from "@/components/I18nMessage";
import { useLanguage } from "@/hooks/Language";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_in_tshirt.png";

import audio_en from "@/assets/audio/AffirmationsAudio/intro_en.wav";
import audio_es from "@/assets/audio/AffirmationsAudio/intro_es.wav";
import audio_es_inc from "@/assets/audio/AffirmationsAudio/intro_es_inc.wav";

const audio_raw = [
  {
    language: "en",
    audio: audio_en,
  },
  {
    language: "es",
    audio: audio_es,
  },
  {
    language: "es-inc",
    audio: audio_es_inc,
  },
];

export const AffirmationsIntro: React.FC = () => {
  const history = useHistory();
  const { populateText } = useLanguage();
  const audios: string[] = populateText(audio_raw).map((a: any) => a.audio);
  return (
    <div className="responsive-height-with-header">
      <DialogueScreen
        audios={audios}
        buttonI18nKey={"common.letsPlay"}
        characterImage={bili}
        onButtonClick={() => {
          history.push("/affirmations/select");
        }}
      >
        <IonText>
          <h1 className="text-5xl color-suelo">
            <I18nMessage id="affirmations.welcome" />
          </h1>
          <I18nMessage
            id="affirmations.welcome"
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
