import React, { FC, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { IonButton, IonText } from "@ionic/react";

import styles from "./styles.module.css";
import { FormattedMessage } from "react-intl";

interface DeckProps {
  cards: { en: string; es: string }[]; // Adjust the type based on data structure
}

export const Deck: FC<DeckProps> = ({ cards }) => {
  const { isImmersive } = useProfile();
  const [swiped, setSwiped] = useState(() => new Set<number>());
  const [offset, incOffset] = useState(1);

  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];

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
        }, 600);
        return;
      }

      // if (mx === -150) {
      //   // If the card is dragged to its maximum distance
      //   // Perform additional animation here
      //   api.start((i) => {
      //     if (swiped_card_index === i) {
      //       return {
      //         zIndex: 0
      //       };
      //     }
      //   });
      // }

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

  const handleWordAudioClick = () => {
    // console.log(cards[offset - 1]);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Render each card with animated properties */}
        {props.map(
          (
            { x, y, rot, scale, zIndex, hidden },
            i, // Index of the card
          ) => (
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
                <h1 className={`${styles.es} text-3xl semibold`}>
                  {cards[i % cards.length].es}
                </h1>
                {/* Render English content if not immersive */}
                {!isImmersive && (
                  <p className="text-lg color-suelo">
                    {cards[i % cards.length].en}
                  </p>
                )}
              </div>
            </animated.div>
          ),
        )}
      </div>
      <div className="sound-button">
        <IonButton
          className="sound-button-background"
          onClick={handleWordAudioClick}
        >
          <img className="sound-icon" src={volumeButton} />
        </IonButton>
        <IonText>
          <h1 className="text-3xl semibold color-suelo">Lee</h1>
          {!isImmersive && <p className="text-lg color-english">Read</p>}
        </IonText>
      </div>
    </>
  );
};
