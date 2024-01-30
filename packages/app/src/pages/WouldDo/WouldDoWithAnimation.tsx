import React, { FC } from "react";
import { Deck } from "./Deck"; // Assuming Deck component is located in the same directory

import styles from "./styles.module.css"; // Adjust the path according to your folder structure

export const WouldDoWithAnimation: FC = () => {
  // Mock data for testing
  const cards = [
    { en: "English 1", es: "Español 1" },
    { en: "English 2", es: "Español 2" },
    { en: "English 3", es: "Español 3" },
  ];

  return (
    <div className={styles.container}>
      <Deck cards={cards} />
    </div>
  );
};
