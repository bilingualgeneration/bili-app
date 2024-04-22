import biliCharacter from "@/assets/icons/bili_character.svg";

import React, { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/hooks/Profile";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import "./StoryFactory.scss";

import audio_5_en from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_5_en.mp3";
import audio_10_en from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_10_en.mp3";
import audio_20_en from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_20_en.mp3";
import audio_30_en from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_30_en.mp3";
import audio_5_es from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_5_es.mp3";
import audio_10_es from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_10_es.mp3";
import audio_20_es from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_20_es.mp3";
import audio_30_es from "@/assets/audio/StoryFactoryAudio/story_factory_congrats_30_es.mp3";

const sounds: any = {
  en: {
    "5": audio_5_en,
    "10": audio_10_en,
    "20": audio_20_en,
    "30": audio_30_en,
  },
  es: {
    "5": audio_5_es,
    "10": audio_10_es,
    "20": audio_20_es,
    "30": audio_30_es,
  },
};

export const StoryFactoryCongrats: React.FC<{
  setShowCongrats: any;
  count: number;
}> = ({ setShowCongrats, count }) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { profile: {isImmersive} } = useProfile();
  const audio_es = new Audio(sounds.es[count.toString()]);
  const audio_en = new Audio(sounds.en[count.toString()]);
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
    <div className="congrats-container margin-top-4">
      <div className="stars-overlay"></div>
      <div className="ion-no-padding sf-card">
        <IonCard className="ion-no-margin">
          <IonCardContent className="margin-right">
            <IonText>
              <h1 className="color-selva">
                {count === 5 && (
                  <FormattedMessage
                    id="story_factory.congrats.title.5"
                    defaultMessage="Congrats!"
                    description="Congrats Title when 5 stories read"
                  />
                )}
                {count === 10 && (
                  <FormattedMessage
                    id="story_factory.congrats.title.10"
                    defaultMessage="Great Job!"
                    description="Congrats Title when 10 stories read"
                  />
                )}
                {count === 20 && (
                  <FormattedMessage
                    id="story_factory.congrats.title.20"
                    defaultMessage="Amazing!"
                    description="Congrats Title when 20 stories read"
                  />
                )}
                {count === 30 && (
                  <FormattedMessage
                    id="story_factory.congrats.title.30"
                    defaultMessage="I knew you could do it!"
                    description="Congrats Title when 30 stories read"
                  />
                )}
              </h1>
              <h2 className="color-selva">
                {count === 5 && (
                  <FormattedMessage
                    id="story_factory.congrats.description.5"
                    defaultMessage="You've created and read five stories. Can you keep going?"
                    description="Congrats Description when 5 stories read"
                  />
                )}
                {count === 10 && (
                  <FormattedMessage
                    id="story_factory.congrats.description.10"
                    defaultMessage="You've created and read ten stories. How many more can you read?"
                    description="Congrats Description when 10 stories read"
                  />
                )}
                {count === 20 && (
                  <FormattedMessage
                    id="story_factory.congrats.description.20"
                    defaultMessage="You've reached twenty stories. You are a super-reader!"
                    description="Congrats Description when 20 stories read"
                  />
                )}
                {count === 30 && (
                  <FormattedMessage
                    id="story_factory.congrats.description.30"
                    defaultMessage="Way to go - you've created and read thirty stories"
                    description="Congrats Description when 30 stories read"
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
                    {count === 30 && "I knew you could do it!"}
                  </h1>
                  <h2>
                    {count === 5 &&
                      "You've created and read five stories. Can you keep going?"}
                    {count === 10 &&
                      "You've created and read ten stories. How many more can you read?"}
                    {count === 20 &&
                      "You've reached twenty stories. You are a super-reader!"}
                    {count === 30 &&
                      "Way to go - you've created and read thirty stories"}
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
                    left: 50,
                    top: 3,
                    position: "absolute",
                  }}
                  className="bounce-arrow"
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
                      id="story_factory.keepGoing"
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
