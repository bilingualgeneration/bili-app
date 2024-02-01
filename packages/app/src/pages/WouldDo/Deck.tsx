import React, { FC, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import styles from "./styles.module.css";
import { any } from "zod";

interface DeckProps {
  cards: { en: string; es: string }[]; // Adjust the type based on data structure
}

export const Deck: FC<DeckProps> = ({ cards }) => {
  const { isImmersive } = useProfile();
  const [swiped, setSwiped] = useState(() => new Set<number>());

  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];

  const [props, api] = useSprings(cards.length, (index) => ({
    x: -2 - index * 5, // Initialize x position of each card
    y: 10 + index * 20, // Initialize y position of each card
    scale: 1, // Initialize scale of each card
    rot: 0, // Initialize rotation angle of each card
    zIndex: cards.length - index, // Initialize zIndex of each card
    delay: index * 100, // Delay before starting the animation
  }));

  // Binding useDrag() hook to each card using bind function
  const bind = useDrag(
    // Callback function triggered when a drag event occurs
    ({
      args: [index], // Index of the dragged card
      down, // Flag indicating if the card is being dragged
      movement: [mx], // Movement along the x-axis
      direction: [xDir], // Direction of movement
    }) => {
      const dir = xDir < 0 ? -1 : 1;
      if (!down && mx < -20) {
        // If the drag ends and the horizontal movement exceeds the threshold
        const swipedCard = cards.shift();
        if (swipedCard != undefined) {
          cards.push(swipedCard);
        }
        console.log(cards[0]["en"]);
        console.log(index);

        // Animate the swiped card to the back and shift other cards forward
        setTimeout(() => {
          // Animate other cards to smoothly shift forward
          api.start((index) => {
            const newIndex = index - 1 < 0 ? cards.length - 1 : index - 1; // Calculate the new index after shifting
            console.log(`Index: ${index} newIndex: ${newIndex}`);
            return {
              x: -2 - (newIndex - 1) * 5, // Shift the card forward
              y: 10 + (newIndex - 1) * 20,
              scale: 1,
              rot: 0,
              zIndex: cards.length - newIndex,
              delay: newIndex * 100,
            };
          });
        }, 600);
        return;
      }

      // Logic for animating the card while it's being dragged
      api.start((i) => {
        if (index !== i) return; // Only update properties for the dragged card

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
            { x, y, rot, scale, zIndex },
            i, // Index of the card
          ) => (
            <animated.div
              {...bind(i)} // Apply the drag gesture binding
              key={i}
              className={styles.card}
              style={{
                backgroundColor: colors[i], // Set background color based on index
                x, // Apply x position
                y: i * -6, // Apply y position (slight vertical offset)
                zIndex, // Apply zIndex
                transform: interpolate(
                  // Interpolate rotation and translation properties
                  [rot, x],
                  (rot, x) => `translateX(${x}px) rotate(${rot}deg)`,
                ),
              }}
            >
              <div className={styles.card_content}>
                <h1 className={styles.es}>{cards[i].es}</h1>
                {/* Render English content if not immersive */}
                {!isImmersive && (
                  <p className={styles.en_content}>{cards[i].en}</p>
                )}
              </div>
            </animated.div>
          ),
        )}
      </div>
    </>
  );
};
