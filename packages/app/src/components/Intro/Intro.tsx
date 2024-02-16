import React, { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import "./Intro.scss";

interface Type {
  text: string;
  subtext: string;
  audio: string;
}
interface IntroProps {
  en: Type;
  es: Type;
  esInc: Type;
}

export const Intro = (data: IntroProps[], image: string, nextPath: string) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isInclusive, isImmersive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const history = useHistory();
  const audio_en = new Audio(data[currentIndex].en.audio);
  const audio_es = new Audio(data[currentIndex].es.audio);
  const audio_es_inc = new Audio(data[currentIndex].esInc.audio);

  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);

  useEffect(() => {
    setCallback(() => () => {
      setAudioPlayed(true);
      setCurrentIndex(currentIndex + 1);
    });
    let sounds = [];
    if (isInclusive) {
      sounds.push(audio_es_inc);
    } else {
      sounds.push(audio_es);
    }
    if (!isImmersive) {
      sounds.push(audio_en);
    }
    addAudio(sounds);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div className="ion-no-padding sf-card">
        <IonCard className="ion-no-margin">
          <IonCardContent>
            <div style={{ paddingRight: 100 }}>
              <h1 className="color-selva">
                {isInclusive && (
                  <FormattedMessage
                    id="storyFactory.welcome_inc" /* Not sure how to alter the id */
                    defaultMessage={data[currentIndex].en.text}
                    description="Main welcome message"
                  />
                )}
                {!isInclusive && (
                  <FormattedMessage
                    id="storyFactory.welcome" /* Not sure how to alter the id */
                    defaultMessage={data[currentIndex].en.text}
                    description="Main welcome message"
                  />
                )}
              </h1>

              <h2 className="color-selva">
                {isInclusive && (
                  <FormattedMessage
                    id="storyFactory.subwelcome_inc" /* Not sure how to alter the id */
                    defaultMessage={data[currentIndex].en.subtext}
                    description="Sub welcome message"
                  />
                )}
                {!isInclusive && (
                  <FormattedMessage
                    id={`storyFactory.subwelcome`}
                    defaultMessage={data[currentIndex].en.subtext}
                    description="Sub welcome message"
                  />
                )}
              </h2>

              {!isImmersive && (
                <>
                  <h1>
                    <br />
                    {data[currentIndex].en.text}
                  </h1>
                  <h2>{data[currentIndex].en.subtext}</h2>
                </>
              )}
            </div>
            {/* Next Button will display after the audio has played and if the current index is the last index */}
            {audioPlayed && currentIndex === data.length - 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <IonButton
                  onClick={() => history.push(nextPath)}
                  shape="round"
                  style={{ width: "auto", height: "auto" }}
                >
                  <div>
                    <h1 style={{ color: "white" }}>Siguiente</h1>
                    <p style={{ color: "black" }}>Next</p>
                  </div>
                </IonButton>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </div>
      <img className="bili-character" src={image} alt="Bili character" />
    </div>
  );
};
