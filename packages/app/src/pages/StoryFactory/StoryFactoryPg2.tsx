import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import biliCharacter from "@/assets/icons/bili_character.svg";
import audio_en_file from "@/assets/audio/story_factory_second_en.mp3";
import audio_es_file from "@/assets/audio/story_factory_second_es.mp3";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";

import "./StoryFactory.scss";

export const StoryFactoryPg2: React.FC = () => {
  const { isImmersive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const audio_en = new Audio(audio_en_file);
  const audio_es = new Audio(audio_es_file);

  useEffect(() => {
    return () => {
      audio_en.pause();
      audio_es.pause();
    };
  });

  useEffect(() => {
    if (isImmersive) {
      audio_es.onended = () => {
        setAudioPlayed(true);
      };
      audio_es.play();
    } else {
      audio_es.onended = () => {
        audio_en.play();
      };
      audio_en.onended = () => {
        setAudioPlayed(true);
      };
    }
    audio_es.play();
    setAudioPlayed(false);
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <div className="sf-card">
        <IonCard className="ion-no-margin" style={{ paddingBottom: "14rem" }}>
          <IonCardContent>
            <div className="right-margin">
              <h1 className="color-selva">
                <FormattedMessage
                  id="storyFactory.create_message"
                  defaultMessage="Create over 4,000 different stories with the swipe of your finger or click of a button"
                  description="Message informing user how many possible stories are available in Story Factory"
                />
              </h1>
              {!isImmersive && (
                <h2>
                  <br />
                  Create over 4,000 different stories with the swipe of your
                  finger or click of a button
                </h2>
              )}
            </div>

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
                href="/story-factory/3"
              >
                <div>
                  <div className="story-button-bold">
                    <FormattedMessage
                      id="storyFactory.nextButton"
                      defaultMessage="Next"
                      description="Button to move to the next page in intro pages"
                    />
                  </div>
                  {!isImmersive && (
                    <div className="story-button-reg">Let's Play</div>
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
