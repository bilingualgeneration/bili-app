import React, { FC, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import styles from "./styles.module.css";

interface DeckProps {
  cards: { en: string; es: string }[]; // Adjust the type based on data structure
}

export const Deck: FC<DeckProps> = ({ cards }) => {
  const { isImmersive } = useProfile();
  const [swiped, setSwiped] = useState(() => new Set<number>());

  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];

  const [props, api] = useSprings(cards.length, (i) => ({
    x: i === 0 ? 0 : -2 - i * 10, // first card (i === 0) starts at 0, and subsequent cards are spaced out to the left (-2 - i * 10)
    y: i === 0 ? 0 : 10 + i * 20, // first card (i === 0) starts at 0, but the cards are spaced vertically (10 + i * 20)
    scale: 1, // controls the size of card, where 1 represents original size
    rot: 0, // initial rotation angle of card
    zIndex: cards.length - i, // first card has the highest zIndex value, and subsequent cards have decreasing zIndex values
    delay: i * 100, // delay before starting the animation
  }));

  // binding useDrag() hook to each card using bind function
  const bind = useDrag(
    //When a drag event occurs, the provided callback function is called:
    ({
      args: [index], // each individual card had an index
      down, // yes being dragged (bool)
      movement: [mx], // mvmt along x axis
      direction: [xDir], // dir. of mvmt
      velocity,
    }) => {
      const dir = xDir < 0 ? -1 : 1;
      if (!down && mx < -20) {
        // If the drag ends (!down) and the horizontal movement (mx) is less than -20, indicating a swipe to the left, we consider the card as swiped
        // If swiped to the left (!down) by a certain threshold (-20)
        swiped.add(index); // add index of swiped card to swiped set
        const moveForward = new Set(
          Array.from(Array(cards.length).keys()).filter((i) => i !== index),
        ); // add rest of cards to moveForward set
        setTimeout(() => {
          // delay the reset of the card's position and animation
          const newSwiped = new Set(swiped); // create a new set newSwiped to avoid mutating original swiped set directly
          newSwiped.delete(index); // delete index of current card from newSwiped, indicating that card is no longer considered swiped
          const newOrder = [...Array(cards.length).keys()].filter(
            // calculate new order for the cards by filtering out the indices that are in newSwiped
            (i) => !newSwiped.has(i),
          );
          newOrder.push(index); // push index of current card to the end of newOrder, ensuring it appears last in deck
          api.start((i) => ({
            // method triggers animation that resets position and properties of each card according to its new order in newOrder--this animation repositions cards as if swiped card has been removed from deck
            x: -2 - i * 10,
            y: 10 + i * 20,
            scale: 1,
            rot: 0,
            zIndex: cards.length - newOrder.indexOf(i),
            delay: i * 100,
          }));
          setSwiped(newSwiped);
        }, 600);
        return;
      }
      api.start((i) => {
        if (index !== i) return; // ensures that animation properties only update for card being dragged

        // Limit the maximum distance dragged to the left
        const maxLeftDistance = -150;
        const constrainedX = down ? Math.min(0, mx) : 0;
        const x = Math.max(maxLeftDistance, constrainedX);

        // Calculate the tilt angle based on the ratio of the current distance to the maximum distance
        const maxRotation = -20;
        const tiltAngle = (x / maxLeftDistance) * maxRotation;

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot: tiltAngle,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : 500 },
        };
      });
    },
  );

  return (
    <>
      <div className={styles.container}>
        {props.map(
          (
            { x, y, rot, scale, zIndex },
            i, // array contains animated properties for each card (position, rotation, scale, & zIndex are set based on the animated props)
          ) => (
            <animated.div
              {...bind(i)} // apply the drag gesture binding
              key={i}
              className={styles.card}
              style={{
                backgroundColor: colors[i],
                x,
                y: i * -10,
                zIndex,
                transform: interpolate(
                  // use interpolate from react-spring to interpolate the rotation and translation properties (rot and x) into CSS transform string
                  [rot, x],
                  (rot, x) => `translateX(${x}px) rotate(${rot}deg)`,
                ),
              }}
            >
              <div className={styles.card_content}>
                <h1 className={styles.es}>{cards[i].es}</h1>
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
