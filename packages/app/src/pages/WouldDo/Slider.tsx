import React, { FC, ReactNode, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import styles from "./styles.module.css";

interface SliderProps {
  children: ReactNode;
  onSwipe?: () => void;
}

const left = {
  bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
  justifySelf: "end",
};
const right = {
  bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
  justifySelf: "start",
};

export const Slider: FC<SliderProps> = ({ children, onSwipe }) => {
  const [{ x, bg, scale, justifySelf }, api] = useSpring(() => ({
    x: 0,
    scale: 1,
    ...left,
  }));
  const [swiped, setSwiped] = useState(false);

  const bind = useDrag(({ active, movement: [x], direction }) => {
    if (active) {
      api.start({
        x,
        scale: 1.1,
        ...(x < 0 ? left : right),
        immediate: (name) => active && name === "x",
      });
      setSwiped(Math.abs(x) >= 300); // Check if swiped beyond threshold
    } else {
      if (swiped && direction[0] < 0) {
        // Swiped left
        onSwipe && onSwipe();
        setTimeout(() => {
          api.start({ x: -500 }); // Move the card behind the revealed card
          setTimeout(() => {
            api.start({ x: -50, scale: 1, ...left }); // Reset the card position and scale with slight offset
          }, 500); // Adjust the duration as needed
        }, 500); // Adjust the delay as needed
      }
      setSwiped(false);
    }
  });

  const rotateSpring = useSpring({
    rotate: swiped ? -30 : 0,
    config: { tension: 200, friction: 10 },
  });

  return (
    <animated.div
      {...bind()}
      className={styles.item}
      style={{ background: bg }}
    >
      <animated.div className={styles.av} style={{ scale, justifySelf }} />
      <animated.div
        className={styles.fg}
        style={{ x, scale, rotate: rotateSpring.rotate.to((r) => `${r}deg`) }}
      >
        {children}
      </animated.div>
    </animated.div>
  );
};
