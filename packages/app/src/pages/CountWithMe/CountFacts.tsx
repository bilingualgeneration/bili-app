import { useProfile } from "@/contexts/ProfileContext";
import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { CongratsPage } from "./CountCongrats";
import { useAudioManager } from "@/contexts/AudioManagerContext";
//temporary audio files, should be chaged for count-with-me files oncel uploade
import audio_en_file from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es_file from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";
import "./countWithMe.scss";
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

  useEffect(() => {
    if (audioPlayed) {
      setShowCongrats(true);
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

    if (isImmersive) {
      if (isInclusive) {
        addAudio([audio_es_inc_file]);
      }
      addAudio([audio_es_file]);
    } else {
      addAudio([audio_es_file, audio_en_file]);
    }
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
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          height: 600,
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
