import { DialogueScreen } from "@/components/DialogueScreen";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";
import bili from "@/assets/img/bili_in_tshirt.png";
import audio_en from "@/assets/audio/CountAudio/instruction_en.mp3";
import audio_es from "@/assets/audio/CountAudio/instruction_es.mp3";
import audio_es_inc from "@/assets/audio/CountAudio/instruction_es_inc.mp3";
import { I18nMessage } from "@/components/I18nMessage";

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

export const CountWithMeIntro: React.FC = () => {
  const {
    profile: { isInclusive },
  } = useProfile();
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
          history.push("/count-with-me/select");
        }}
      >
        <IonText>
          <h1 className="text-5xl color-suelo">
            <I18nMessage id="count.welcome" />
          </h1>
          <I18nMessage
            id="count.welcome"
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
