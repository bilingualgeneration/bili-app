import React, { FC, useEffect, useState } from "react";
import update from "immutability-helper";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag } from "react-dnd";
import { LetterSegment } from "./LetterSegment";
import { DropZone } from "./DropZone";
import { IonText } from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";
import "./Stories.scss";
import { Container } from "./Container";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";

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
  const { isInclusive, isImmersive } = useProfile();
  const [chosenLanguageData, setChosenLanguageData] = useState<LetterData[]>(
    [],
  );
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track active index for correct order
  const [correctDrops, setCorrectDrops] = useState<boolean[]>([]); // Track correct drops for each letter

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
      setCorrectDrops(new Array(extractedLetters.length).fill(false));
    }
  }, [data, isInclusive]);

  // Function to handle drop event
  const handleDrop = (index: number) => {
    console.log("Dropped at index:", index);
    if (index === activeIndex) {
      console.log("Correct drop!");
      setActiveIndex(activeIndex + 1);
      const updatedCorrectDrops = [...correctDrops];
      updatedCorrectDrops[index] = true;
      setCorrectDrops(updatedCorrectDrops);
    } else {
      console.log("Incorrect drop!");
      const updatedCorrectDrops = [...correctDrops];
      updatedCorrectDrops[index] = false;
      setCorrectDrops(updatedCorrectDrops);
    }
  };

  const [letters, setLetters] = useState<{
    [key: string]: {
      top: number;
      left: number;
      title: string;
    };
  }>({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });

  const moveBox = (id: string, left: number, top: number) => {
    setLetters(
      update(letters, {
        [id]: {
          $merge: { left, top },
        },
      }),
    );
  };

  const [, drop] = useDrag(
    () => ({
      type: "LETTER",
      item: { id: "letter", index: 0, left: 0, top: 0 },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

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
              onDrop={handleDrop}
              correctDrop={correctDrops[index]}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
