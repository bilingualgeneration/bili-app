import React, { FC, useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag } from "react-dnd";
import { LetterSegment } from "./LetterSegment";
import { DropZone } from "./DropZone";
import { IonText } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import "./Stories.scss";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import { letters } from "./letters";

interface LetterAudio {
  url: string;
}

interface LetterData {
  esText?: string;
  esAudio?: LetterAudio;
  esIncText?: string;
  esIncAudio?: LetterAudio;
}

interface Game {
  dnd_letters: Array<{
    letter: Array<{
      language: string;
      text: string;
      audio: LetterAudio;
    }>;
  }>;
}

interface StoriesGameProps {
  game: Game;
}

export const StoriesDragGame: FC<StoriesGameProps> = ({ game: data }) => {
  const {profile: { isInclusive, isImmersive }} = useProfile();
  const [chosenLanguageData, setChosenLanguageData] = useState<LetterData[]>(
    [],
  );
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track active index for correct order

  const getRandomPosition = () => {
    const xOffset = Math.floor(Math.random() * (window.innerWidth - 100));
    const yOffset = Math.floor(Math.random() * (window.innerHeight - 100));
    return { x: xOffset, y: yOffset };
  };

  useEffect(() => {
    if (data !== undefined) {
      // Extract letters and audio based on the value of isInclusive
      const extractedLetters = data.dnd_letters.map((letterItem: any) => {
        if (isInclusive) {
          const esIncItems = letterItem.letter.filter(
            (item: any) => item.language === "es-inc",
          );
          return {
            esIncText: esIncItems.length > 0 ? esIncItems[0].text : "",
            esIncAudio: esIncItems.length > 0 ? esIncItems[0].audio : undefined,
          };
        } else {
          const esItems = letterItem.letter.filter(
            (item: any) => item.language === "es",
          );
          return {
            esText: esItems.length > 0 ? esItems[0].text : "",
            esAudio: esItems.length > 0 ? esItems[0].audio : undefined,
          };
        }
      });

      // Set the state variables based on the extracted letters and audio
      setChosenLanguageData(extractedLetters);
    }
  }, [data, isInclusive]);

  // Calculate positions for draggable letters around the background letters
  const calculateRandomPositions = () => {
    const backgroundLettersContainer = document.querySelector(
      ".dropzone-container",
    );
    if (!backgroundLettersContainer) return [];

    const containerRect = backgroundLettersContainer.getBoundingClientRect();
    const positions: { x: number; y: number }[] = [];

    for (let i = 0; i < chosenLanguageData.length; i++) {
      const xOffset = containerRect.left + Math.random() * containerRect.width;
      const yOffset = containerRect.top + Math.random() * containerRect.height;
      positions.push({ x: xOffset, y: yOffset });
    }

    return positions;
  };

  // Randomize positions of draggable letters around background letters
  const randomizedPositions = calculateRandomPositions();

  // Function to handle drop event
  const handleDrop = (index: number) => {
    console.log("Dropped at index:", index);
    if (index === activeIndex) {
      // Correct drop
      console.log("Correct drop!");
      setActiveIndex(activeIndex + 1); // Increment active index
    } else {
      // Incorrect drop
      console.log("Incorrect drop!");
      // Implement logic to handle incorrect drop (red shadow, audio, etc.)
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="stories-dnd">
        <IonText class="ion-text-center">
          {isImmersive ? (
            isInclusive ? (
              <h1>
                Arrastra y suelta las letras para formar la palabra "amigues".
              </h1>
            ) : (
              <h1>
                Arrastra y suelta las letras para formar la palabra "amigos".
              </h1>
            )
          ) : (
            <h1>
              Drag and drop the letters to form the word "
              {isInclusive ? "amigues" : "amigos"}".
            </h1>
          )}
        </IonText>

        <div className="dropzone-container">
          {chosenLanguageData.map((letter, index) => (
            <DropZone
              key={index}
              letter={isInclusive ? letter.esIncText : letter.esText}
              index={index}
              expectedIndex={index}
              onDrop={handleDrop}
            />
          ))}
        </div>

        <div className="draggable-container">
          {chosenLanguageData.map((letter, index) => (
            <LetterSegment
              key={index}
              letter={
                isInclusive ? letter.esIncText || "" : letter.esText || ""
              }
              audio={isInclusive ? letter.esIncAudio : letter.esAudio}
              index={index}
              position={randomizedPositions[index]}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
