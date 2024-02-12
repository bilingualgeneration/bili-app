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
    // return <CongratsPage count={count} onKeepGoingClick={onKeepGoingClick} />;
  }

  // Function to render the facts page for each animal
  return (
    <>
      <div
        style={{
          backgroundColor: "#F7FAF9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            width: "1159px",
            height: "640px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "row", // Use row to align content horizontally
            justifyContent: "center", // Center content horizontally
            alignItems: "stretch", // Align items to stretch vertically
            padding: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start", // Align text content to the left
              padding: "20px",
            }}
          >
            <IonText>
              <h1 className="fact-spanish-text-style">{factText[1].text}</h1>
              {!isImmersive && (
                <p className="fact-english-text-style">{factText[0].text}</p>
              )}
            </IonText>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end", // Align map image to the right
              padding: "20px",
            }}
          >
            <img
              src={factBackground}
              alt={factText[0].text}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
