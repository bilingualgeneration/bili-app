import { FC, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import biliCharacter from "@/assets/icons/bili_character.svg";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useHistory } from "react-router-dom";
import audio_en_file from "@/assets/audio/story_factory_first_en.mp3";
import audio_es_file from "@/assets/audio/story_factory_first_es.mp3";
import audio_es_inc_file from "@/assets/audio/story_factory_first_es-inc.mp3";
import "./StoryFactory.scss";

export const StoryFactoryPg1: FC = () => {
  const { isInclusive, isImmersive } = useProfile();
  const history = useHistory();
  const audio_en = new Audio(audio_en_file);
  const audio_es = new Audio(audio_es_file);
  const audio_es_inc = new Audio(audio_es_inc_file);
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
          history.push("/story-factory/2");
        };
        audio_es_inc.play();
      } else {
        audio_es.onended = () => {
          history.push("/story-factory/2");
        };
        audio_es.play();
      }
    } else {
      audio_en.onended = () => {
        history.push("/story-factory/2");
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
                    defaultMessage="Welcome to the Story Factory!"
                    description="Main welcome message on Story Factory"
                  />
                )}
                {!isInclusive && (
                  <FormattedMessage
                    id="storyFactory.welcome"
                    defaultMessage="Welcome to the Story Factory!"
                    description="Main welcome message on Story Factory"
                  />
                )}
              </h1>

              <h2 className="color-selva">
                {isInclusive && (
                  <FormattedMessage
                    id={`storyFactory.subwelcome_inc`}
                    defaultMessage="A place for silly syllabic reading!"
                    description="Sub welcome message on Story Factory"
                  />
                )}
                {!isInclusive && (
                  <FormattedMessage
                    id={`storyFactory.subwelcome`}
                    defaultMessage="A place for silly syllabic reading!"
                    description="Sub welcome message on Story Factory"
                  />
                )}
              </h2>

              {!isImmersive && (
                <>
                  <h1>
                    <br />
                    Welcome to the story factory!
                  </h1>
                  <h2>A place for silly syllabic reading!</h2>
                </>
              )}
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
