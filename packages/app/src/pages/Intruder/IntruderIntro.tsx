import biliCharacter from "@/assets/img/bili_in_coat.png";
import { FormattedMessage } from "react-intl";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";

import audio_en_file from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es_file from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";

import "./Intruder.scss";

export const IntruderIntro: React.FC = () => {
  const { isInclusive, isImmersive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();

  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);
  useEffect(() => {
    setCallback(() => () => {
      setAudioPlayed(true);
    });
    let sounds = [];
    if (isInclusive) {
      sounds.push(audio_es_inc_file);
    } else {
      sounds.push(audio_es_file);
    }
    if (!isImmersive) {
      sounds.push(audio_en_file);
    }
    addAudio(sounds);
  }, []);
  const history = useHistory();
  /*
  const audio_en = new Audio(audio_en_file);
  const audio_es = new Audio(audio_es_file);
  const audio_es_inc = new Audio(audio_es_inc_file);

  useEffect(() => {
    return () => {
      audio_en.pause();
      audio_es.pause();
      audio_es_inc.pause();
    };
  }, []);

  useEffect(() => {
    if (isImmersive) {
      if (isInclusive) {
        audio_es_inc.onended = () => {
          setAudioPlayed(true);
        };
        audio_es_inc.play();
      } else {
        audio_es.onended = () => {
          setAudioPlayed(true);
        };
        audio_es.play();
      }
    } else {
      audio_en.onended = () => {
        setAudioPlayed(true);
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
*/
  return (
    <div className="sf-card">
      <IonCard className="ion-no-margin">
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="8">
                <IonText>
                  <h1 className="color-selva">
                    {isInclusive && (
                      <FormattedMessage
                        id={`intruder.welcome_inc`}
                        defaultMessage="The Intruder"
                        description="Main welcome message on Story Factory"
                      />
                    )}
                    {!isInclusive && (
                      <FormattedMessage
                        id={`intruder.welcome`}
                        defaultMessage="The Intruder"
                        description="Main welcome message on Story Factory"
                      />
                    )}
                  </h1>
                  <h2 className="color-selva">
                    {isInclusive && (
                      <FormattedMessage
                        id="intruder.subwelcome_inc"
                        defaultMessage='Welcome to "The Intruder" game! The goal of this game is to identify the word that does not rhyme with the rest.'
                        description="Sub welcome message on Intruder"
                      />
                    )}
                    {!isInclusive && (
                      <FormattedMessage
                        id="intruder.subwelcome"
                        defaultMessage='Welcome to "The Intruder" game! The goal of this game is to identify the word that does not rhyme with the rest.'
                        description="Sub welcome message on Intruder"
                      />
                    )}
                  </h2>
                  {!isImmersive && (
                    <>
                      <h1>
                        <br />
                        The Intruder
                      </h1>
                      <h2>
                        The goal of this game is to identify the word that does
                        not rhyme with the rest.
                      </h2>
                    </>
                  )}
                </IonText>
              </IonCol>
              <IonCol size="4">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <img
                      src={biliCharacter}
                      style={{ width: "100%", height: "auto" }}
                      alt="Bili character"
                    />
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
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
              href="/intruder-game/select"
            >
              <div>
                <div className="story-button-bold">
                  <FormattedMessage
                    id="intruder.nextButton"
                    defaultMessage="Next"
                    description="Button to move to the next page in intro pages"
                  />
                </div>
                {!isImmersive && <div className="story-button-reg">Next</div>}
              </div>
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
