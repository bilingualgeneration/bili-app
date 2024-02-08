import React, { FC, useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag } from "react-dnd";
import { LetterSegment } from "./LetterSegment";
import { DropZone } from "./DropZone";
import { IonText } from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";
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
  const { isImmersive } = useProfile();
  const [esLetterData, setEsLetterData] = useState<LetterData[] | null>(null);
  const [esIncletterData, setEsIncLetterData] = useState<LetterData[] | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track active index for correct order

  const getRandomPosition = () => {
    const xOffset = Math.floor(Math.random() * (window.innerWidth - 100));
    const yOffset = Math.floor(Math.random() * (window.innerHeight - 100));
    return { x: xOffset, y: yOffset };
  };

  useEffect(() => {
    if (data !== undefined) {
      const esLetters = data.dnd_letters[0].letter.filter(
        (item) => item.language === "es",
      );
      const esIncLetters = data.dnd_letters[0].letter.filter(
        (item) => item.language === "es-inc",
      );

      const esCombinedLetters = esLetters.map((esItem, index) => ({
        esText: esItem.text,
        esAudio: esItem.audio,
      }));

      const esIncCombinedLetters = esIncLetters.map((esIncItem, index) => ({
        esIncText: esIncItem.text,
        esIncAudio: esIncItem.audio,
      }));

      setEsLetterData(esCombinedLetters);
      setEsIncLetterData(esIncCombinedLetters);
    }
  }, [data]);

  // Calculate positions for draggable letters around the background letters
  const calculateRandomPositions = () => {
    const backgroundLetters = document.querySelectorAll(".background-letter");
    const positions: { x: number; y: number }[] = [];
    backgroundLetters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const xOffset = rect.left + Math.random() * rect.width;
      const yOffset = rect.top + Math.random() * rect.height;
      positions.push({ x: xOffset, y: yOffset });
    });
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
        <h1>Arrastra y suelta las letras para formar la palabra "amigos".</h1>
        {!isImmersive && (
          <p>Drag and drop the letters to form the word "amigos."</p>
        )}

        {/* Rendering DropZone components */}
        <div className="dropzone-container">
          {esLetterData &&
            esLetterData.map((letter: any, index: any) => (
              <DropZone
                key={index}
                letter={letter.esText}
                index={index}
                expectedIndex={index}
                onDrop={handleDrop}
              />
            ))}
        </div>

        {/* Rendering draggable LetterSegment components */}
        <div className="draggable-container">
          {esIncletterData &&
            esIncletterData.map((letter: any, index: any) => (
              <LetterSegment
                key={index}
                letter={letter.esIncText}
                audio={letter.esIncAudio}
                position={randomizedPositions[index]}
                index={index}
              />
            ))}
        </div>
      </div>
    </DndProvider>
  );
};
