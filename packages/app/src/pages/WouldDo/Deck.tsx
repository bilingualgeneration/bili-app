import React, { FC, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import styles from "./WouldDoAnimationStyles.module.css";

interface DeckProps {
  cards: { en: string; es: string }[]; // Adjust the type based on data structure
}

export const Deck: FC<DeckProps> = ({ cards }) => {
  const { isImmersive } = useProfile();
  const [gone] = useState(() => new Set<number>());

  const [props, api] = useSprings(cards.length, (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  }));

  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => ({ ...props[i], ...to(i) }));
        }, 600);
    },
  );

  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={i}
          className={`${styles.deck} ${i === 0 ? styles.endCard : ""}`}
          style={{
            x: i * -20,
            y: i * -20, // To adjust overlap of cards in deck
            zIndex: cards.length - i, // To adjust z-index to ensure correct stacking order
          }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate(
                [rot, scale],
                (r, s) =>
                  `perspective(2500px) rotateX(0deg) rotateY(${
                    r / 0
                  }deg) rotateZ(${r}deg) scale(${s})`,
              ),
              // Adjust the rendering of cards based on data structure
            }}
          >
            <div className={styles.card}>
              <h3>{cards[i].es}</h3>
              {isImmersive && <p>{cards[i].en}</p>}
            </div>
          </animated.div>
        </animated.div>
      ))}
    </>
  );
};
