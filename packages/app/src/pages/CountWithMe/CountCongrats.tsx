import { IonButton, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import StoryFactoryArrow from "@/assets/icons/story_factory_arrow.png";
import { useProfile } from "@/contexts/ProfileContext";
import { FormattedMessage } from "react-intl";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useHistory } from "react-router-dom";

// audio
import count_congrats_en_3 from '@/assets/audio/CountAudio/count_congrats_en_3.mp3';
import count_congrats_en_6 from '@/assets/audio/CountAudio/count_congrats_en_6.mp3';
import count_congrats_en_9 from '@/assets/audio/CountAudio/count_congrats_en_9.mp3';
import count_congrats_en_13 from '@/assets/audio/CountAudio/count_congrats_en_13.mp3';
import count_congrats_es_3 from '@/assets/audio/CountAudio/count_congrats_es_3.mp3';
import count_congrats_es_6 from '@/assets/audio/CountAudio/count_congrats_es_6.mp3';
import count_congrats_es_9 from '@/assets/audio/CountAudio/count_congrats_es_9.mp3';
import count_congrats_es_13 from '@/assets/audio/CountAudio/count_congrats_es_13.mp3';

// svgs
import congratsStar from "@/assets/icons/count_congrats_star.svg";
import starsOverlay from "@/assets/icons/sf_stars_overlay.svg";

import "./CountWithMe.scss";

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

export const CountCongrats: React.FC<{
  onKeepGoingClick?: any;
  count?: number;
}> = ({ onKeepGoingClick, count }) => {
  // Function to render the congrats page
  const congrats = {
    star: congratsStar,
  };

  const { isInclusive, isImmersive } = useProfile();
  const [showText, setShowText] = useState(true); // State to show/hide text
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();

  // can potentially uncomment once 'congrats after x animals' screen is built

  // const audio_es = new Audio(sounds.es[count.toString()]);
  // const audio_en = new Audio(sounds.en[count.toString()]);

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
        addAudio([]);
      }
      addAudio([]);
    } else {
      addAudio([]);
    }
  }, []);

  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, 3000); // Set timeout to hide text after 3 seconds

    return () => clearTimeout(timeout);
  }, []); // This effect runs only once

  return (
    <div style={{ padding: "10px", position: "relative" }}>
      <div
        style={{
          height: "80vh",
          width: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={starsOverlay}
          style={{
            position: "absolute",
            maxHeight: "85vh",
            top: "-30px",
            left: "15%",
            zIndex: 1,
          }}
          alt="background"
        />
        <IonText>
          <h1 className="text-4xl color-suelo semibold">
            <FormattedMessage
              id="countWithMe.complete"
              defaultMessage="Activity Completed"
              description="Information that the activity is completed"
            />
          </h1>
          {!isImmersive && (
            <p className="text-2xl color-english" style={{ textAlign: "center" }}>
              Activity Completed
            </p>
          )}
        </IonText>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 3,
            textAlign: "center",
          }}
        >
          <img
            src={congrats.star}
            alt="star"
            style={{
              width: showText ? "700px" : "200px",
              height: "auto",
              position: "relative",
              transition: "width 1s ease", // transition effect to animate star shrink
            }}
          />
          {showText && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Center text horizontally and vertically in the star
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

              {!isImmersive && (
                <p className="text-sm color-english">
                  You've earned a star
                </p>
              )}
            </div>
          )}
        </div>

        {/* Arrow and Button Container */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "40%",
            transform: "translateX(-40%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <img
            src={StoryFactoryArrow}
            alt="indicator arrow to the next button"
            style={{ marginRight: "10px" }}
            className="bounce-arrow"
          />
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
              {!isImmersive && (
                <div className="story-button-reg">Keep going!</div>
              )}
            </div>
          </IonButton>
        </div>
        {/* End of Arrow and Button Container */}
      </div>
    </div>
  );
};
