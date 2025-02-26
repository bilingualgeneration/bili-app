import { DialogueScreen } from "@/components/DialogueScreen";
import { I18nMessage } from "@/components/I18nMessage";
import { useLanguage } from "@/hooks/Language";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_in_coat.png";

import audio_en from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";
import { useEffect } from "react";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useI18n } from "@/hooks/I18n";

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

export const IntruderIntro: React.FC = () => {
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
          history.push("/intruder/select");
        }}
      >
        <IonText>
          <h1 className="text-5xl color-suelo">
            <I18nMessage id="intruder.welcome" />
          </h1>
          <I18nMessage
            id="intruder.welcome"
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
