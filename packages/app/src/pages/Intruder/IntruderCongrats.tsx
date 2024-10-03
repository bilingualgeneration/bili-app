import biliCharacter from "@/assets/img/bili_in_coat.png";
import React, { useState, useEffect } from "react";
import { first } from "rxjs/operators";
import { FormattedMessage } from "react-intl";
import { getFunctions, httpsCallable } from "firebase/functions";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useActivity } from "@/contexts/ActivityContext";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useTimeTracker } from "@/hooks/TimeTracker";

import "./Intruder.scss";
import "../StoryFactory/StoryFactory.scss";

/*
import audio_5_en from "@/assets/audio/IntruderAudio/intruder_congrats_5_en.mp3";
import audio_10_en from "@/assets/audio/IntruderAudio/intruder_congrats_10_en.mp3";
import audio_20_en from "@/assets/audio/IntruderAudio/intruder_congrats_20_en.mp3";
import audio_all_en from "@/assets/audio/IntruderAudio/intruder_congrats_all_en.mp3";
import audio_5_es from "@/assets/audio/IntruderAudio/intruder_congrats_5_es.mp3";
import audio_10_es from "@/assets/audio/IntruderAudio/intruder_congrats_10_es.mp3";
import audio_20_es from "@/assets/audio/IntruderAudio/intruder_congrats_20_es.mp3";
import audio_all_es from "@/assets/audio/IntruderAudio/intruder_congrats_all_es.mp3";

const sounds: any = {
  en: {
    "5": audio_5_en,
    "10": audio_10_en,
    "20": audio_20_en,
    all: audio_all_en,
  },
  es: {
    "5": audio_5_es,
    "10": audio_10_es,
    "20": audio_20_es,
    all: audio_all_es,
  },
};
*/

export const IntruderCongrats: React.FC<{
  setShowCongrats: any;
  count: number; // note: when pack is done, count = -1
}> = ({ setShowCongrats, count }) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { language } = useLanguageToggle();
  const { handleRecordAttempt } = useActivity();
  const { startTimer, stopTimer } = useTimeTracker();
  const { addAudio, clearAudio, onended } = useAudioManager();

  useEffect(() => {
    handleRecordAttempt(stopTimer());
    let audio = [];
    if (language === "es" || language === "esen") {
      audio.push(
        `/assets/audio/intruder/congrats_${
          count === -1 ? "all" : count
        }_es.mp3`,
      );
    }
    if (language === "en" || language === "esen") {
      audio.push(
        `/assets/audio/intruder/congrats_${
          count === -1 ? "all" : count
        }_en.mp3`,
      );
    }
    onended.pipe(first()).subscribe(() => {
      setAudioPlayed(true);
    });
    addAudio(audio);
    return () => {
      clearAudio();
    };
  }, []);
  return (
    <div className="padding-top-2" style={{ position: "relative" }}>
      <div className="stars-overlay"></div>
      <div className="ion-no-padding sf-card">
        <IonCard className="ion-no-margin">
          <IonCardContent className="margin-right">
            <IonText>
              {language.startsWith("es") && (
                <>
                  <h1 className="text-6xl color-suelo">
                    <FormattedMessage
                      id={`intruder.congrats.title.${
                        count === 0 ? "all" : count
                      }`}
                    />
                  </h1>
                  <h2 className="text-4xl color-suelo">
                    <FormattedMessage
                      id={`intruder.congrats.description.${
                        count === 0 ? "all" : count
                      }`}
                    />
                  </h2>
                </>
              )}
              {language === "en" && (
                <>
                  <h1 className="text-6xl color-suelo">
                    {count === 5 && "Congrats!"}
                    {count === 10 && "Great job!"}
                    {count === 20 && "Amazing!"}
                    {count === 0 && "I knew you could do it!"}
                  </h1>
                  <h2 className="text-4xl color-suelo">
                    {count === 5 && (
                      <>
                        You've found five rhyme intruders.
                        <br />
                        Can you keep going?
                      </>
                    )}
                    {count === 10 && (
                      <>
                        You've found ten rhyme intruders.
                        <br />
                        How many more can you find?
                      </>
                    )}
                    {count === 20 && (
                      <>
                        You've found twenty rhyme intruders.
                        <br />
                        You are a super-rhymer!
                      </>
                    )}
                    {count === 0 && (
                      <>Way to go - you've found all of the rhyme intruders!</>
                    )}
                  </h2>
                </>
              )}
              {language === "esen" && (
                <div className="margin-top-3">
                  <h1 className="text-5xl color-english">
                    {count === 5 && "Congrats!"}
                    {count === 10 && "Great job!"}
                    {count === 20 && "Amazing!"}
                    {count === 0 && "I knew you could do it!"}
                  </h1>
                  <h2 className="text-3xl color-english">
                    {count === 5 && (
                      <>
                        You've found five rhyme intruders.
                        <br />
                        Can you keep going?
                      </>
                    )}
                    {count === 10 && (
                      <>
                        You've found ten rhyme intruders.
                        <br />
                        How many more can you find?
                      </>
                    )}
                    {count === 20 && (
                      <>
                        You've found twenty rhyme intruders.
                        <br />
                        You are a super-rhymer!
                      </>
                    )}
                    {count === 0 && (
                      <>Way to go - you've found all of the rhyme intruders!</>
                    )}
                  </h2>
                </div>
              )}
            </IonText>

            <div
              style={{
                position: "relative",
                textAlign: "center",
                marginTop: "5rem",
              }}
            >
              {audioPlayed && (
                <img
                  src={StoryFactoryArrow}
                  alt="indicator arrow to next button"
                  style={{
                    left: 0,
                    top: 3,
                    position: "absolute",
                  }}
                />
              )}
              <IonButton
                className="sf-intro-button"
                disabled={!audioPlayed}
                expand="block"
                shape="round"
                type="button"
                onClick={() => {
                  startTimer();
                  setShowCongrats(false);
                }}
              >
                <IonText>
                  <p className="text-3xl semibold color-nube">
                    <FormattedMessage
                      id="intruder.keepGoing"
                      defaultMessage="Keep Going!"
                      description="Button label to exit congrats screen"
                    />
                  </p>
                  {true && <p className="text-sm color-nube">Keep going!</p>}
                </IonText>
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
      <img
        className="bili-character"
        src={biliCharacter}
        alt="Bili character"
      />
    </div>
  );
};
