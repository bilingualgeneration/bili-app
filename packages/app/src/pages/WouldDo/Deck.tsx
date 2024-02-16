import React, { FC, useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { AudioManager, useAudioManager } from "@/contexts/AudioManagerContext";
import {
  SpringValue,
  useSprings,
  animated,
  to as interpolate,
} from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { IonButton, IonText } from "@ionic/react";

import styles from "./styles.module.css";

interface CardAudio {
  url: string;
}

interface DeckProps {
  cards: {
    esText?: string;
    esAudio?: CardAudio | null;
    enText?: string;
    enAudio?: CardAudio | null;
    esIncText?: string;
    esIncAudio?: CardAudio | null;
  }[];
  isImmersive: boolean;
  isInclusive: boolean;
}

export const Deck: FC<DeckProps> = ({ cards, isImmersive, isInclusive }) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0); // Track current card index
  const [currentCard, setCurrentCard] = useState<{
    esAudio?: CardAudio | null;
    esIncAudio?: CardAudio | null;
    enAudio?: CardAudio | null;
  } | null>(null);

  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];

  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);

  useEffect(() => {
    setCallback(() => () => {
      setAudioPlayed(true);
    });
    const audioSources: string[] = [];
    cards.forEach((card) => {
      if (isInclusive) {
        if (card.esIncAudio) audioSources.push(card.esIncAudio.url);
      } else {
        if (card.esAudio) audioSources.push(card.esAudio.url);
      }
      if (!isImmersive && card.enAudio) audioSources.push(card.enAudio.url);
    });
    addAudio(audioSources);
  }, []);

  // Function to play audio for the current card
  const playAudio = (index: number) => {
    console.log(`Playing audio: ${index}`);
    const card = cards[index];
    let audioUrl = "";
    if ((!isImmersive && !isInclusive) || (isImmersive && !isInclusive)) {
      audioUrl = card.esAudio?.url || "";
    } else {
      audioUrl = card.esIncAudio?.url || "";
    }

    // console.log(audioUrl);

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      audio.addEventListener("ended", () => {
        // Check if EN audio should be played based on settings and availability
        if (!isImmersive && card.enAudio) {
          const enAudioUrl = card.enAudio.url;
          const enAudio = new Audio(enAudioUrl);
          enAudio.play();
        }
      });
    } else {
      console.error("Audio source is undefined or null.");
    }
  };

  const [props, api] = useSprings(cards.length, (i) => ({
    x: -2 - i * 5, // Initialize x position of each card
    y: 10 - i * 10, // Initialize y position of each card
    scale: 1, // Initialize scale of each card
    rot: 0, // Initialize rotation angle of each card
    zIndex: cards.length - i, // Initialize zIndex of each card
    delay: i * 100, // Delay before starting the animation
    hidden: i > 5 ? false : true,
  }));

  // Binding useDrag() hook to each card using bind function
  const bind = useDrag(
    // Callback function triggered when a drag event occurs
    ({
      args: [swiped_card_index], // Index of the dragged card
      down, // Flag indicating if the card is being dragged
      movement: [mx], // Movement along the x-axis
      direction: [xDir], // Direction of movement
    }) => {
      const dir = xDir < 0 ? -1 : 1;
      if (!down && mx < -20) {
        // If the drag ends and the horizontal movement exceeds the threshold
        stopAudio();
        // Animate the swiped card and shift other cards forward
        setTimeout(() => {
          api.start((i) => {
            if (i === swiped_card_index) {
              return {
                x: -2 - (cards.length - 1) * 5,
                y: 10 - (cards.length - 1) * 10,
                scale: 1,
                rot: 0,
                zIndex: 0,
                delay: 0,
              };
            } else {
              const distance =
                (i - (swiped_card_index + 1) + cards.length) % cards.length; // calculates the distance between the current card (i) and the swiped card (index)
              return {
                x: -2 - distance * 5,
                y: 10 - distance * 10,
                scale: 1,
                rot: 0,
                zIndex: cards.length - distance,
                delay: distance * 100,
              };
            }
          });
          const newCount = (currentCardIndex + 1) % cards.length;
          setCurrentCardIndex(newCount);
        }, 500);
        return;
      }

      // Logic for animating the card while it's being dragged
      api.start((i) => {
        if (swiped_card_index !== i) {
          return; // Skip animation for cards other than the swiped card
        }

        // Limit the maximum distance dragged to the left
        const maxLeftDistance = -150;
        const constrainedX = down ? Math.min(0, mx) : 0;
        const x = Math.max(maxLeftDistance, constrainedX);

        // Calculate the tilt angle based on the ratio of the current distance to the maximum distance
        const maxRotation = -20;
        const tiltAngle = (x / maxLeftDistance) * maxRotation;

        const scale = down ? 1.1 : 1; // Increase scale when card is being dragged
        return {
          x,
          rot: tiltAngle,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : 500 }, // Adjust animation configuration based on drag state
        };
      });
    },
  );

  // Function to stop audio playback
  const stopAudio = () => {
    const audio = new Audio();
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <>
      <div className={styles.container}>
        {props.map(({ x, y, rot, scale, zIndex, hidden }, i) => {
          const card = cards[i % cards.length];
          const { esText, esAudio, esIncText, esIncAudio, enText, enAudio } =
            card;
          let content = null;
          if (isImmersive && isInclusive) {
            content = (
              <>
                <h1 className={`${styles.es} text-3xl semibold`}>
                  {esIncText}
                </h1>
              </>
            );
          } else if (isImmersive && !isInclusive) {
            content = (
              <>
                <h1 className={`${styles.es} text-3xl semibold`}>{esText}</h1>
              </>
            );
          } else if (!isImmersive && isInclusive) {
            content = (
              <>
                <h1 className={`${styles.es} text-3xl semibold`}>
                  {esIncText}
                </h1>
                <p className="text-lg color-english">{enText}</p>
              </>
            );
          } else {
            content = (
              <>
                <h1 className={`${styles.es} text-3xl semibold`}>{esText}</h1>
                <p className="text-lg color-english">{enText}</p>
              </>
            );
          }

          return (
            <animated.div
              {...bind(i)}
              key={i}
              className={styles.card}
              style={{
                backgroundColor: colors[i % colors.length],
                x,
                y,
                zIndex,
                display: hidden ? "inline-block" : "none",
                transform: interpolate(
                  [rot, x],
                  (rot, x) => `translateX(${x}px) rotate(${rot}deg)`,
                ),
              }}
            >
              <div className={styles.card_content}>{content}</div>
            </animated.div>
          );
        })}
      </div>
      <div className="sound-button">
        <IonButton
          className="sound-button-background"
          onClick={() => {
            if (currentCardIndex < cards.length) {
              playAudio(currentCardIndex);
            } else {
              console.error("No more cards to play audio for.");
            }
          }}
        >
          <img className="sound-icon" src={volumeButton} alt="volume" />
        </IonButton>
        <IonText>
          <h1 className="text-3xl semibold color-suelo">Lee</h1>
          {!isImmersive && <p className="text-lg color-english">Read</p>}
        </IonText>
      </div>
    </>
  );
};
