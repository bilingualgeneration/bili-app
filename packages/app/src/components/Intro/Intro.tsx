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
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
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
}
interface IntroProps {
  texts: DataObject[];
  image: string;
  nextPath: string;
}

export const Intro: React.FC<IntroProps> = ({ texts, image, nextPath }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isImmersive } = useProfile();
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
      if (currentIndex < texts.length - 1) {
        // increment index to render next message/audio
        setCurrentIndex(currentIndex + 1);
      } else {
        // all audio has played
        setAudioPlayed(true);
      }
    });
    let sounds = [];
    sounds.push(texts[currentIndex].es.audio);
    if(isImmersive){
      sounds.push(texts[currentIndex].en.audio);
    }
    addAudio(sounds);
  }, [currentIndex, texts]);

  return (
    <div className='intro-card'>
      <div className="ion-no-padding sf-card margin-top-4">
        <IonCard className="ion-no-margin">
          <IonCardContent>
            <div style={{ paddingRight: 100 }}>
              <h1 className="text-6xl color-suelo">
                {texts[currentIndex].es.text}
              </h1>
              <h2 className="text-4xl color-suelo">
                {texts[currentIndex].es.subtext}
              </h2>
	      {!isImmersive && <>
		<h1 className="text-6xl color-english margin-top-4">
                  {texts[currentIndex].en.text}
		</h1>
		<h2 className="text-4xl color-english">
                  {texts[currentIndex].en.subtext}
		</h2>
	      </>}
            </div>
            {/* Next Button will display after the audio has played and if the current index is the last index */}
            <div
	      className='margin-top-4'
	      style={{position: 'relative'}}>
              {audioPlayed && currentIndex === texts.length - 1 && (
		<img
                  src={StoryFactoryArrow}
                  alt="indicator arrow to next button"
                  style={{
                    left: 0,
                    top: 30,
                    position: "absolute",
                  }}
                />
              )}
              <IonButton
                onClick={() => history.push(nextPath)}
		className='margin-top-3'
		disabled={!audioPlayed}
                shape="round"
		expand='block'
                style={{width: '50%', margin: 'auto'}}>
		<IonText>
                <h1
                  style={{ color: "white" }}
                  className="text-4xl color-nube">
                  Siguiente
                </h1>
		{!isImmersive && 
                 <p
                   style={{ color: "black" }}
                   className="text-xl color-nube">
                   Next
                 </p>
		}
		</IonText>
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
      <img className="bili-character" src={image} alt="Bili character" />
    </div>
  );
};
