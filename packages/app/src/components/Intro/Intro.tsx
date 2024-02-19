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
import React, { useEffect, useState } from "react";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import "./Intro.scss";

interface Type {
  text: string;
  subtext: string;
  audio: string;
}
interface DataObject {
  en: Type;
  es: Type;
  //esInc: Type;
}
interface IntroProps {
  data: DataObject[];
  image: string;
  nextPath: string;
  //gameName: string; // used for the FormattedMessage id
}

export const Intro: React.FC<IntroProps> = ({
  data,
  image,
  nextPath,
  //gameName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isInclusive, isImmersive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const history = useHistory();

  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);

  useEffect(() => {
    setCallback(() => () => {
      if (currentIndex < data.length - 1) {
        // increment index to render next message/audio
        setCurrentIndex(currentIndex + 1);
      } else {
        // all audio has played
        setAudioPlayed(true);
      }
    });
    let sounds = [];
    if (isInclusive) {
      sounds.push(data[currentIndex].esInc.audio);
    } else {
      sounds.push(data[currentIndex].es.audio);
    }
    if (!isImmersive) {
      sounds.push(data[currentIndex].en.audio);
    }
    addAudio(sounds);
  }, [currentIndex, isInclusive, isImmersive, data]);

  return (
    <div style={{ position: "relative" }}>
      <div className="ion-no-padding sf-card">
        <IonCard className="ion-no-margin">
          <IonCardContent>
            <div style={{ paddingRight: 100 }}>
              <h1 className="text-6xl color-suelo">
                {isInclusive && (
                  <FormattedMessage
                    id={gameName + ".welcome_inc"}
                    defaultMessage={data[currentIndex].en.text}
                    description="Main welcome message"
                  />
                )}
                {!isInclusive && (
                  <FormattedMessage
                    id={gameName + ".welcome"}
                    defaultMessage={data[currentIndex].en.text}
                    description="Main welcome message"
                  />
                )}
              </h1>

              <h2 className="text-4xl color-suelo">
                {isInclusive && data[currentIndex].es.subtext}
                {!isInclusive && (
                  <FormattedMessage
                    id={gameName + "intruder.subwelcome"}
                    defaultMessage={data[currentIndex].es.subtext}
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
