import {useProfile} from "@/hooks/Profile";
import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { CountWithMeCongrats } from "./CountWithMeCongrats";
import { useAudioManager } from "@/contexts/AudioManagerContext";
//temporary audio files, should be chaged for count-with-me files oncel uploade
import "./CountWithMe.scss";
import { useHistory } from "react-router";
import {useLanguageToggle} from '@/components/LanguageToggle';

interface FactsPageProps {
  factText: any[]; // Adjust the type according to what factText actually contains
  factBackground: string;
  count: number;
  onKeepGoingClick: () => void;
}

export const CountWithMeFacts: React.FC<FactsPageProps> = ({
  factText,
  factBackground,
  count,
  onKeepGoingClick,
}) => {
  const {profile: { isInclusive}} = useProfile();
  const {language} = useLanguageToggle();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const ften = factText.filter((f) => f.language === 'en')[0];
  const ftes = factText.filter((f) => f.language === 'es')[0];
  const ftesinc = factText.filter((f) => f.language === 'es-inc')[0];
  
  useEffect(() => {
    if (audioPlayed) {
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
    switch(language){
      case 'en':
	audios.push(ften.audio.url);
	break;
      case 'es':
	audios.push(isInclusive ? ftesinc.audio.url : ftes.audio.url);
	break;
      case 'esen':
	audios.push(isInclusive ? ftesinc.audio.url : ftes.audio.url);
	audios.push(ften.audio.url);
	break;
      default:
	break;
    }
    addAudio(audios);
  }, []);
  const history = useHistory();

  if (showCongrats) {
    return <CountWithMeCongrats count={count} onKeepGoingClick={onKeepGoingClick} />;
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
          <h1 className="text-3xl semibold color-suelo">
	    {language !== 'en' && ftes.text}
	    {language === 'en' && ften.text}
	  </h1>
          {language === 'esen' && (
            <p className="text-2xl color-english margin-top-2">
              {ften.text}
            </p>
          )}
        </IonText>
      </div>
    </>
  );
};
