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
    x: i === 0 ? 0 : -2 - i * 10, //x === 0 if first card. Subsequent cards will be positioned to the left of the first card with a gap of 20 units between each card.
    y: i === 0 ? 0 : 10 + i * 20, //y === 0 if first card. Subsequent cards will be positioned below the first card with a gap of 20 units between each card.
    scale: 1, // controls the size of the card, where 1 represents original size
    rot: 0,
    zIndex: cards.length - i, // first card has the highest zIndex value, and subsequent cards have decreasing zIndex values
    delay: i * 100, // determines the delay before each card's animation starts
  }));

  const bind = useDrag(
    ({
      args: [index],
      down /* yes being dragged */,
      movement: [mx] /* mvmt along x axis */,
      direction: [xDir] /* dir. of mvmt */,
      velocity,
    }) => {
      const dir = xDir < 0 ? -1 : 1;
      if (!down && mx < -20) {
        // If swiped to the left (!down) by a certain threshold (-20)
        swiped.add(index);
        setTimeout(() => {
          const newSwiped = new Set(swiped);
          newSwiped.delete(index);
          const newOrder = [...Array(cards.length).keys()].filter(
            (i) => !newSwiped.has(i),
          );
          newOrder.push(index);
          api.start((i) => ({
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
        if (index !== i) return; // ensures that animation properties only updated for card being dragged

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
        {props.map(({ x, y, rot, scale, zIndex }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            className={styles.card}
            style={{
              backgroundColor: colors[i],
              x,
              y: i * -10,
              zIndex,
              transform: interpolate(
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
        ))}
      </div>
    </>
  );
};
