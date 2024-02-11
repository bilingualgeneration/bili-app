import React, { FC, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useHistory } from "react-router-dom";
import audio_en_file from "@/assets/audio/story_factory_first_en.mp3";
import audio_es_file from "@/assets/audio/story_factory_first_es.mp3";
import audio_es_inc_file from "@/assets/audio/story_factory_first_es-inc.mp3";
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
  const page = 1;
  const { isInclusive, isImmersive } = useProfile();
  const history = useHistory();
  const audio_en = new Audio(data[page].en.audio);
  const audio_es = new Audio(data[page].es.audio);
  const audio_es_inc = new Audio(data[page].esInc.audio);
  useEffect(() => {
    return () => {
      audio_en.pause();
      audio_es.pause();
      audio_es_inc.pause();
    };
  });
  useEffect(() => {
    if (isImmersive) {
      if (isInclusive) {
        audio_es_inc.onended = () => {
          history.push(nextPath);
        };
        audio_es_inc.play();
      } else {
        audio_es.onended = () => {
          history.push(nextPath);
        };
        audio_es.play();
      }
    } else {
      audio_en.onended = () => {
        history.push(nextPath);
      };
      if (isInclusive) {
        audio_es_inc.onended = () => {
          audio_en.play();
        };
        audio_es_inc.play();
      } else {
        audio_es.onended = () => {
          audio_en.play();
        };
        audio_es.play();
      }
    }
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
                    id="storyFactory.welcome_inc"
                    defaultMessage={data[page].en.text}
                    description="Main welcome message"
                  />
                )}
                {!isInclusive && (
                  <FormattedMessage
                    id="storyFactory.welcome"
                    defaultMessage={data[page].en.text}
                    description="Main welcome message"
                  />
                )}
              </h1>

              <h2 className="color-selva">
                {isInclusive && (
                  <FormattedMessage
                    id={`storyFactory.subwelcome_inc`}
                    defaultMessage={data[page].en.subtext}
                    description="Sub welcome message"
                  />
                )}
                {!isInclusive && (
                  <FormattedMessage
                    id={`storyFactory.subwelcome`}
                    defaultMessage={data[page].en.subtext}
                    description="Sub welcome message"
                  />
                )}
              </h2>

              {!isImmersive && (
                <>
                  <h1>
                    <br />
                    {data[page].en.text}
                  </h1>
                  <h2>{data[page].en.subtext}</h2>
                </>
              )}
            </div>
          </IonCardContent>
        </IonCard>
      </div>
      <img className="bili-character" src={image} alt="Bili character" />
    </div>
  );
};
