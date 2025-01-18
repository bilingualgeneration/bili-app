import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";

import bili from "@/assets/img/bili_in_tshirt.png";

import audio_en from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";
import { useEffect } from "react";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { I18nMessage } from "@/components/I18nMessage";
import { useI18n } from "@/hooks/I18n";

export const IntruderIntro: React.FC = () => {
  const { language } = useLanguage();
  const {
    profile: { isInclusive },
  } = useProfile();
  const history = useHistory();
  const { addAudio, clearAudio } = useAudioManager();
  const { getText } = useI18n();

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

  useEffect(() => {
    addAudio(audios);
    return () => {
      clearAudio();
    };
  }, []);

  return (
    <div className="responsive-height-with-header">
      <DialogueScreen
        audios={audios}
        buttonTextPrimary={getText("common.letsPlay", 1, "authed") ?? ""}
        buttonTextSecondary={getText("common.letsPlay", 2, "authed") ?? ""}
        characterImage={bili}
        onButtonClick={() => {
          history.push("/intruder-game/select");
        }}
      >
        <IonText>
          <h1 className="text-5xl color-suelo">
            <I18nMessage id="intruder.welcome" />
          </h1>

          <I18nMessage
            id="intruder.welcome"
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-3xl color-english">{text}</h2>
            )}
          />
        </IonText>
      </DialogueScreen>
    </div>
  );
};
