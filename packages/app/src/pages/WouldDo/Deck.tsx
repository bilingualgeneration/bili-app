import React, { FC, useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { AudioManager, useAudioManager } from "@/contexts/AudioManagerContext";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { IonButton, IonText } from "@ionic/react";

import styles from "./styles.module.css";

interface CardAudio {
  url: string;
}

interface CardData {
  esText?: string;
  esAudio?: CardAudio;
  esIncText?: string;
  esIncAudio?: CardAudio;
  entext?: string;
  enAudio?: CardAudio;
}

interface CardItemData {
  questions: Array<{
    question: Array<{
      language: string;
      text: string;
      audio: CardAudio;
    }>;
  }>;
}

interface DeckProps {
  cards: {
    en?: { text: string; audio: string };
    es?: { text: string; audio: string };
    esInc?: { text: string; audio: string };
  }[];
}

export const Deck: FC<DeckProps> = ({ cards }) => {
  const { isInclusive, isImmersive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  q;
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
    console.log("CARDS:" + cards);
    // let sounds = cards.map(cardItem);
    // if (isInclusive) {
    //   sounds.push(cards.en.audio);
    // } else {
    //   sounds.push(audio_es_file);
    // }
    // if (!isImmersive) {
    //   sounds.push(audio_en_file);
    // }
    // addAudio(sounds);
  }, []);

  const handleQuestionAudioClick = (audioSrc: string) => {
    const audio = new Audio(audioSrc);
    console.log(audioSrc);
    try {
      audio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
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

        // Animate the swiped card and shift other cards forward
        setTimeout(() => {
          api.start((i) => {
            // console.log(`i is: ${i}`);
            if (i === swiped_card_index) {
              // if the current card (i) is the same as the swiped card (index). If it is, it means this is the card that was just swiped.
              // console.log(`index is: ${swiped_card_index}`);
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

  return (
    <>
      <div className={styles.container}>
        {/* Render each card with animated properties */}
        {props.map(
          (
            { x, y, rot, scale, zIndex, hidden },
            i, // Index of the card
          ) => {
            // const { en, es } = cards[i % cards.length];
            return (
              <animated.div
                {...bind(i)} // Apply the drag gesture binding
                key={i}
                className={styles.card}
                style={{
                  backgroundColor: colors[i % colors.length], // Cycle through colors
                  x, // Apply x position
                  y, // Apply y position (slight vertical offset)
                  zIndex, // Apply zIndex
                  display: hidden ? "inline-block" : "none",
                  transform: interpolate(
                    // Interpolate rotation and translation properties
                    [rot, x],
                    (rot, x) => `translateX(${x}px) rotate(${rot}deg)`,
                  ),
                }}
              >
                <div className={styles.card_content}>
                  {!isInclusive && (
                    <h1 className={`${styles.es} text-3xl semibold`}>
                      {cards.esInc.text}
                    </h1>
                  )}
                  {/* <h1 className={`${styles.es} text-3xl semibold`}>{es.text}</h1> */}
                  {/* Render English content if not immersive */}
                  {!isImmersive && (
                    <p className="text-lg color-suelo">"test2"</p>
                    // <p className="text-lg color-suelo">{en.text}</p>
                  )}
                </div>
              </animated.div>
            );
          },
        )}
      </div>
      {/* Render audio button outside of the card */}
      <div className="sound-button">
        <IonButton
          className="sound-button-background"
          onClick={() => handleQuestionAudioClick(cards.es.audio)}
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
