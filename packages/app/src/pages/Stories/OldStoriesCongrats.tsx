import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useProfile } from "@/hooks/Profile";
import { FormattedMessage } from "react-intl";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useHistory } from "react-router-dom";
import { useLanguage } from "@/hooks/Language";
import { first } from "rxjs/operators";

// audio
import count_congrats_en_3 from "@/assets/audio/CountAudio/count_congrats_en_3.mp3";
import count_congrats_en_6 from "@/assets/audio/CountAudio/count_congrats_en_6.mp3";
import count_congrats_en_9 from "@/assets/audio/CountAudio/count_congrats_en_9.mp3";
import count_congrats_en_13 from "@/assets/audio/CountAudio/count_congrats_en_13.mp3";
import count_congrats_es_3 from "@/assets/audio/CountAudio/count_congrats_es_3.mp3";
import count_congrats_es_6 from "@/assets/audio/CountAudio/count_congrats_es_6.mp3";
import count_congrats_es_9 from "@/assets/audio/CountAudio/count_congrats_es_9.mp3";
import count_congrats_es_13 from "@/assets/audio/CountAudio/count_congrats_es_13.mp3";
import activity_completed_en from "@/assets/audio/CountAudio/activity_completed_en.mp3";
import activity_completed_es from "@/assets/audio/CountAudio/activity_completed_es.mp3";

// svgs
import congratsStar from "@/assets/icons/count_congrats_star.svg";
import starsOverlay from "@/assets/icons/sf_stars_overlay.svg";
import { useActivity } from "@/contexts/ActivityContext";

const sounds: any = {
  en: {
    "3": count_congrats_en_3,
    "6": count_congrats_en_6,
    "9": count_congrats_en_9,
    "13": count_congrats_en_13,
  },
  es: {
    "3": count_congrats_es_3,
    "6": count_congrats_es_6,
    "9": count_congrats_es_9,
    "13": count_congrats_es_13,
  },
};

export const StoriesCongrats: React.FC<{
  onKeepGoingClick?: any;
  count?: number;
}> = ({ onKeepGoingClick, count }) => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguage();
  const [showText, setShowText] = useState(true); // State to show/hide text
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, onended } = useAudioManager();

  const { stars } = useActivity();
  const loading = stars === 0;

  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);

  useEffect(() => {
    onended.pipe(first()).subscribe(() => {
      setAudioPlayed(true);
    });
    let audios = [];
    switch (language) {
      case "en":
        audios.push(activity_completed_en);
        break;
      case "es":
        audios.push(activity_completed_es);
        break;
      case "esen":
        audios.push(activity_completed_es);
        audios.push(activity_completed_en);
        break;
      default:
        break;
    }
    addAudio(audios);
  }, [stars]);

  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, 3000); // Set timeout to hide text after 3 seconds

    return () => clearTimeout(timeout);
  }, []); // This effect runs only once
  return (
    <>
      <div style={{ padding: "20px" }}>
        <img
          src={starsOverlay}
          style={{
            position: "absolute",
            top: "70px",
            left: "calc(40% - 250px)",
            zIndex: 1,
          }}
          alt="background"
        />

        {!loading && (
          <div
            className="margin-top-4"
            style={{
              width: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "end",
              position: "relative",
              gap: "1rem",
            }}
          >
            <IonText>
              <h1 className="text-4xl color-suelo semibold">
                <FormattedMessage
                  id="countWithMe.complete"
                  defaultMessage="Activity Completed"
                  description="Information that the activity is completed"
                />
              </h1>
              {language === "esen" && (
                <p
                  className="text-2xl color-english"
                  style={{ textAlign: "center" }}
                >
                  Activity Completed
                </p>
              )}
            </IonText>

            <div
              style={{
                display: "flex",
                position: "relative",
                zIndex: 3,
              }}
            >
              {Array.from({ length: stars }, (value: number) => (
                <img
                  key={value}
                  className="congrats-star"
                  src={congratsStar}
                  alt="star"
                />
              ))}
              {showText && (
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: "50%",
                    left: "55%",
                    transform: "translate(-50%, -50%)", // Center horizontally
                    zIndex: "3",
                  }}
                >
                  <div className="text-3xl semibold">
                    <FormattedMessage
                      id="countWithMe.congrats"
                      defaultMessage="You've earned a star"
                      description="Congrats text on a star"
                    />
                  </div>

                  {language === "esen" && (
                    <p className="text-sm color-english">
                      You've earned a star
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!loading && (
        <div
          style={{
            position: "relative",
            textAlign: "center",
            zIndex: 2,
            marginTop: "auto",
          }}
        >
          {audioPlayed && (
            <img
              src={StoryFactoryArrow}
              alt="indicator arrow to the next button"
              style={{
                left: "calc(50% - 350px)",
                top: 3,
                position: "absolute",
              }}
              className="bounce-arrow"
            />
          )}
          <IonButton
            className="sf-intro-button"
            disabled={!audioPlayed}
            expand="block"
            shape="round"
            type="button"
            onClick={onKeepGoingClick}
          >
            <div>
              <div className="story-button-bold">
                <FormattedMessage
                  id="countWithMe.keepGoing"
                  defaultMessage="Keep Going!"
                  description="Button label to exit congrats screen"
                />
              </div>
              {language === "esen" && (
                <div className="story-button-reg">Keep going!</div>
              )}
            </div>
          </IonButton>
        </div>
      )}
    </>
  );
};
