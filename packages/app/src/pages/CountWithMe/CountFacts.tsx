import { useProfile } from "@/contexts/ProfileContext";
import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { CongratsPage } from "./CountCongrats";
import { useAudioManager } from "@/contexts/AudioManagerContext";
//temporary audio files, should be chaged for count-with-me files oncel uploade
import "./CountWithMe.scss";
import { useHistory } from "react-router";

interface FactsPageProps {
  factText: any[]; // Adjust the type according to what factText actually contains
  factBackground: string;
  count: number;
  onKeepGoingClick: () => void;
}

export const FactsPage: React.FC<FactsPageProps> = ({
  factText,
  factBackground,
  count,
  onKeepGoingClick,
}) => {
  const { isInclusive, isImmersive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const ften = factText.filter((f) => f.language === 'en')[0];
  const ftes = factText.filter((f) => f.language === 'es')[0];
  const ftesinc = factText.filter((f) => f.language === 'es-inc')[0];
  
  useEffect(() => {
    if (audioPlayed) {
      //setShowCongrats(true);
      onKeepGoingClick();
    }
  }, [audioPlayed]);

  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);
  useEffect(() => {
    setCallback(() => () => {
      setAudioPlayed(true);
    });
    let audios = [];
    if(isInclusive){
      audios.push(ftesinc.audio.url);
    }else{
      audios.push(ftes.audio.url);
    }
    if(!isImmersive){
      if(ften && ften.audio){
	audios.push(ften.audio.url);
      }
    }
    addAudio(audios);
  }, []);
  const history = useHistory();

  if (showCongrats) {
    return <CongratsPage count={count} onKeepGoingClick={onKeepGoingClick} />;
  }

  // Function to render the facts page for each animal
  return (
    <>
      <div
        className="background-card margin-top-3"
        style={{
          backgroundImage: `url(${factBackground})`,
	  backgroundSize: 'auto 100%',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
	  aspectRatio: '1159 / 724',
	  width: '80%',
          display: "flex",
          alignItems: "center",
        }}
      >
        <IonText style={{ width: "50%" }}>
          <h1 className="text-3xl semibold color-suelo">{factText[1].text}</h1>
          {!isImmersive && (
            <p className="text-2xl color-english margin-top-2">
              {factText[0].text}
            </p>
          )}
        </IonText>
      </div>
    </>
  );
};
