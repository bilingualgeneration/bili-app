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
  const [gone, setGone] = useState(() => new Set<number>());

  const colors = ["#D3EAE8", "#FFAEDC", "#EEE8DE", "#FFE24F", "#FF8B70"];

  const [props, api] = useSprings(cards.length, (i) => ({
    x: i === 0 ? 0 : -2 - i * 20,
    y: i === 0 ? 0 : 10 + i * 20,
    scale: 1,
    rot: i === 0 ? 10 : -10 + Math.random() * 20,
    zIndex: cards.length - i, // Add zIndex property
    delay: i * 100,
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const dir = xDir < 0 ? -1 : 1;
      if (!down && mx < -100) {
        // If swiped to the left by a certain threshold
        gone.add(index);
        setTimeout(() => {
          const newGone = new Set(gone);
          newGone.delete(index);
          const newOrder = [...Array(cards.length).keys()].filter(
            (i) => !newGone.has(i),
          );
          newOrder.push(index);
          api.start((i) => ({
            x: -2 - i * 20,
            y: 10 + i * 20,
            scale: 1,
            rot: -10 + Math.random() * 20,
            zIndex: cards.length - newOrder.indexOf(i),
            delay: i * 100,
          }));
          setGone(newGone);
        }, 600);
        return;
      }
      api.start((i) => {
        if (index !== i) return;
        const x = down ? mx : 0;
        const rot = mx / 100;
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : 500 },
        };
      });
    },
  );

  return (
    <>
      {props.map(({ x, y, rot, scale, zIndex }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          className={styles.deck}
          style={{
            backgroundColor: colors[i],
            x,
            y: i * -10,
            zIndex,
          }}
        >
          <animated.div
            style={{
              transform: interpolate(
                [rot, scale],
                (r, s) =>
                  `perspective(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${s})`,
              ),
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
