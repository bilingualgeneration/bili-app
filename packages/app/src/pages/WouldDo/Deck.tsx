/*
  todo: prevent cards below top card from being swipeable
  can use pointer-events: none to do that
  however react-springs not getting this css styling
*/

const MAX_CARDS_SHOWN = 1;


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

import styles from "./styles.module.scss";

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
    setCallback(() => {
      // do nothing
    });
    return () => {
      clearAudio();
    };
  }, []);

  // Function to play audio for the current card
  const playAudio = (index: number) => {
    // console.log(`Playing audio: ${index}`);
    const card = cards[index];
    let audios = [];
    if ((!isImmersive && !isInclusive) || (isImmersive && !isInclusive)) {
      if (card.esAudio) {
        audios.push(card.esAudio.url);
      }
      //audioUrl = card.esAudio?.url || "";
    } else {
      if (card.esIncAudio) {
        audios.push(card.esIncAudio.url);
      }
      //audioUrl = card.esIncAudio?.url || "";
    }

    if (!isImmersive && card.enAudio) {
      audios.push(card.enAudio.url);
    }
    addAudio(audios);
  };

  const [props, api] = useSprings(cards.length, (i) => {
    return {
      x: -2 - i * 5, // Initialize x position of each card
      y: 10 - i * 10, // Initialize y position of each card
      scale: 1, // Initialize scale of each card
      rot: 0, // Initialize rotation angle of each card
      zIndex: cards.length - i, // Initialize zIndex of each card
      delay: i * 100, // Delay before starting the animation
    };
  });

  const newCount = (currentCardIndex + 1) % cards.length;

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
            // console.log(`This is the swiped card index: ${swiped_card_index}`);
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
                zIndex: cards.length - distance - 1,
                delay: distance * 100,
              };
            }
          });
          clearAudio();
          const newCount = (currentCardIndex + 1) % cards.length;
          setCurrentCardIndex(newCount);
        }, 500);
        return;
      }

      // Logic for animating the card while it's being dragged
      api.start((i) => {
        if (swiped_card_index !== i) {
          // console.log(`This is the swiped card index: ${swiped_card_index}`);
          return; // This allows for swipe to be limited to one card at a time vs all cards together
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
    {props.map(({ x, y, rot, scale, zIndex }, i) => {
          // console.log("Card index:", i);
          const card = cards[i % cards.length];
          const { esText, esAudio, esIncText, esIncAudio, enText, enAudio } =
            card;
          let content = null;
          if (isImmersive && isInclusive) {
            content = (
              <>
                <h1 className={`${styles.es} text-2xl semibold`}>
                  {esIncText}
                </h1>
              </>
            );
          } else if (isImmersive && !isInclusive) {
            content = (
              <>
                <h1 className={`${styles.es} text-2xl semibold`}>{esText}</h1>
              </>
            );
          } else if (!isImmersive && isInclusive) {
            content = (
              <>
                <h1 className={`${styles.es} text-2xl semibold`}>
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
		pointerEvents: i === currentCardIndex ? 'auto' : 'none',
                transform: interpolate(
                  [rot, x],
                  (rot, x) => `translateX(${x}px) rotate(${rot}deg)`,
                ),
              }}
            >
              <div className={styles.card_content}>
		{content}
	      </div>
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
