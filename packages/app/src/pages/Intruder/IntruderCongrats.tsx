import biliCharacter from "@/assets/img/bili_in_coat.png";
import React, { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { httpsCallable } from "firebase/functions";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { useFunctions } from "reactfire";

import "./Intruder.scss";
import "../StoryFactory/StoryFactory.scss";

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

export const IntruderCongrats: React.FC<{
  setShowCongrats: any;
  count: number; // note: when pack is done, count = -1
}> = ({ setShowCongrats, count }) => {
  const {
    activeChildProfile: { uid },
  } = useChildProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { isImmersive } = useProfile();
  const audio_es = new Audio(
    sounds.es[count === -1 ? "all" : count.toString()],
  );
  const audio_en = new Audio(
    sounds.en[count === -1 ? "all" : count.toString()],
  );
  const functions = useFunctions();

  useEffect(() => {
    // increment number of completions
    const completionFunction = httpsCallable(
      functions,
      "user-child-profile-completion-add",
    );
    const data: any = {
      uid,
      module: "intruder",
      moduleAdd: 5,
      completionsAdd: 1,
    };
    completionFunction(data);
  }, []);

  useEffect(() => {
    return () => {
      audio_es.pause();
      audio_en.pause();
    };
  }, []);
  useEffect(() => {
    if (isImmersive) {
      audio_es.onended = () => {
        setAudioPlayed(true);
      };
    } else {
      audio_es.onended = () => {
        audio_en.onended = () => {
          setAudioPlayed(true);
        };
        audio_en.play();
      };
    }
    audio_es.play();
  }, []);
  return (
    <div style={{ position: "relative", marginTop: "4rem" }}>
      <div className="stars-overlay"></div>
      <div className="ion-no-padding sf-card">
        <IonCard className="ion-no-margin">
          <IonCardContent className="margin-right">
            <IonText>
              <h1 className="color-selva">
                {count === 5 && (
                  <FormattedMessage
                    id="intruder.congrats.title.5"
                    defaultMessage="Congrats!"
                    description="Congrats Title when 5 correct"
                  />
                )}
                {count === 10 && (
                  <FormattedMessage
                    id="intruder.congrats.title.10"
                    defaultMessage="Great Job!"
                    description="Congrats Title when 10 correct"
                  />
                )}
                {count === 20 && (
                  <FormattedMessage
                    id="intruder.congrats.title.20"
                    defaultMessage="Amazing!"
                    description="Congrats Title when 20 correct"
                  />
                )}
                {count === -1 && (
                  <FormattedMessage
                    id="intruder.congrats.title.all"
                    defaultMessage="I knew you could do it!"
                    description="Congrats Title when all correct"
                  />
                )}
              </h1>
              <h2 className="color-selva">
                {count === 5 && (
                  <FormattedMessage
                    id="intruder.congrats.description.5"
                    defaultMessage="You've found five rhyme intruders. Can you keep going?"
                    description="Congrats Description when 5 correct"
                  />
                )}
                {count === 10 && (
                  <FormattedMessage
                    id="intruder.congrats.description.10"
                    defaultMessage="You've found ten rhyme intruders. How many more can you find?"
                    description="Congrats Description when 10 correct"
                  />
                )}
                {count === 20 && (
                  <FormattedMessage
                    id="intruder.congrats.description.20"
                    defaultMessage="You've found twenty rhyme intruders. You are a super-rhymer!"
                    description="Congrats Description when 20 correct"
                  />
                )}
                {count === -1 && (
                  <FormattedMessage
                    id="intruder.congrats.description.all"
                    defaultMessage="Way to go - you've found all of the rhyme intruders!"
                    description="Congrats Description when all correct"
                  />
                )}
              </h2>

              {!isImmersive && (
                <>
                  <h1>
                    <br />
                    {count === 5 && "Congrats!"}
                    {count === 10 && "Great job!"}
                    {count === 20 && "Amazing!"}
                    {count === -1 && "I knew you could do it!"}
                  </h1>
                  <h2>
                    {count === 5 &&
                      "You've found five rhyme intruders. Can you keep going?"}
                    {count === 10 &&
                      "You've found ten rhyme intruders. How many more can you find?"}
                    {count === 20 &&
                      "You've found twenty rhyme intruders. You are a super-rhymer!"}
                    {count === -1 &&
                      "Way to go - you've found all of the rhyme intruders!"}
                  </h2>
                </>
              )}
            </IonText>

            <div
              style={{
                position: "relative",
                textAlign: "center",
                marginTop: "10rem",
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
                  setShowCongrats(false);
                }}
              >
                <div>
                  <div className="story-button-bold">
                    <FormattedMessage
                      id="intruder.keepGoing"
                      defaultMessage="Keep Going!"
                      description="Button label to exit congrats screen"
                    />
                  </div>
                  {!isImmersive && (
                    <div className="story-button-reg">Keep going!</div>
                  )}
                </div>
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
