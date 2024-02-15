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

  const handleQuestionAudioClick = (audioSrc: string) => {
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      console.log(audioSrc);
      try {
        audio.play();
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
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

    onRest: () => {
      // Callback triggered when all animations have settled
      const currentCardIndex = Math.abs(Math.round(Math.min(...xValues) / 100)); // Calculate current card index
      if (currentCardIndex < cards.length) {
        const currentCard = cards[currentCardIndex]; // Get the current card data
        console.log("Current Card:", currentCard);
        // Update state or perform other actions with the current card data
      }
    },
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
            const card = cards[i % cards.length]; // Get the current card data
            const { esText, esAudio, esIncText, esIncAudio, enText, enAudio } =
              card;

            // Determine which content to display based on user settings
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
                <div className={styles.card_content}>{content}</div>
              </animated.div>
            );
          },
        )}
      </div>
      {/* Render audio button outside of the card */}
      <div className="sound-button">
        <IonButton
          className="sound-button-background"
          onClick={() => {
            console.log("Props:", props);
            console.log("Cards:", cards);
            if (props && props.length > 0) {
              // Check if props array is defined and not empty
              const xValues = props.map((prop) => prop.x.get()); // Extract all x values

              const currentCardIndex = Math.abs(
                Math.round(Math.min(...xValues) / 100),
              ); // Calculate current card index
              console.log(
                "Intermediate value after division by 100:",
                currentCardIndex,
              );

              // Check if cards array is not empty and if the currentCardIndex is within its bounds
              if (cards.length > 0 && currentCardIndex < cards.length) {
                const currentCard = cards[currentCardIndex]; // Get the current card data
                console.log("Current Card:", currentCard);

                // Add null check to ensure currentCard exists
                if (currentCard) {
                  const { esAudio, esIncAudio, enAudio } = currentCard;

                  // Check if the audio source exists before attempting to play it
                  if (isImmersive && isInclusive) {
                    if (esIncAudio) {
                      handleQuestionAudioClick(esIncAudio.url || "");
                    } else {
                      console.error(
                        "Audio source for isImmersive && isInclusive is undefined or null.",
                      );
                    }
                  } else if (isImmersive && !isInclusive) {
                    if (esAudio) {
                      handleQuestionAudioClick(esAudio.url || "");
                    } else {
                      console.error(
                        "Audio source for isImmersive & !isInclusive is undefined or null.",
                      );
                    }
                  } else if (!isImmersive && isInclusive) {
                    if (enAudio) {
                      handleQuestionAudioClick(enAudio.url || "");
                    } else {
                      console.error(
                        "Audio source for !isImmersive & isInclusive is undefined or null.",
                      );
                    }
                  } else {
                    if (esAudio) {
                      handleQuestionAudioClick(esAudio.url || "");
                    } else {
                      console.error("Audio source is undefined or null.");
                    }
                  }
                } else {
                  console.error("Current card is undefined.");
                }
              } else {
                console.error("No cards available or invalid card index.");
              }
            } else {
              console.error("Props array is undefined or empty.");
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
