import { FC, useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { LetterSegment } from "./LetterSegment";
import { DropZone } from "./DropZone";
import { IonText } from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";
import "./Stories.scss";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import React from "react";

interface LetterImage {
  url: string;
  height: number;
  width: number;
}

interface LetterAudio {
  url: string;
}

interface Game {
  dnd_letters: Array<{
    audio: LetterAudio;
    image_background: LetterImage;
    image_foreground: LetterImage;
  }>;
}

interface StoriesGameProps {
  game: Game;
}

export const StoriesDragGame: FC<StoriesGameProps> = ({ game: data }) => {
  const { isImmersive } = useProfile();
  const [letterData, setLetterData] = useState<any>(null);

  const getRandomPosition = () => {
    const xOffset = Math.floor(Math.random() * (window.innerWidth - 100));
    const yOffset = Math.floor(Math.random() * (window.innerHeight - 100));
    return { x: xOffset, y: yOffset };
  };

  useEffect(() => {
    if (data !== undefined) {
      // Separate image_background and image_foreground letters
      const backgroundLettersData = data.dnd_letters.map((letterItem: any) => ({
        backgroundletter: (
          <img src={letterItem.image_background.url} alt="dropzone-letter" />
        ),
      }));
      const foregroundLettersData = data.dnd_letters.map(
        (letterItem: any, index: number) => ({
          foregroundletter: (
            <LetterSegment
              letter={
                <img
                  src={letterItem.image_foreground.url}
                  alt="draggable-letter"
                />
              }
              width={letterItem.image_foreground.width}
              height={letterItem.image_foreground.height}
              position={getRandomPosition()} // Set random position
              index={index} // Make sure to pass the index prop
              onDrop={handleDrop}
            />
          ),
          width: letterItem.image_foreground.width,
          height: letterItem.image_foreground.height,
        }),
      );

      setLetterData({ backgroundLettersData, foregroundLettersData });
    }
  }, [data]);

  // Function to handle drop event
  const handleDrop = (index: number) => {
    console.log("Dropped at index:", index);
    // Todo: Implement logic to check if the dropped letter is in the correct order and handle correct/incorrect drop here
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="stories-dnd">
        <IonText class="ion-text-center">
          <h1>Arrastra y suelta las letras para formar la palabra "amigos".</h1>
          {!isImmersive && (
            <p>Drag and drop the letters to form the word "amigos."</p>
          )}
        </IonText>
        {/* Render DropZone components */}
        <div className="dropzone-container">
          {letterData &&
            letterData.backgroundLettersData.map(
              (letter: any, index: number) => (
                <DropZone
                  key={index}
                  letter={letter.backgroundletter}
                  index={index}
                  expectedIndex={index}
                  onDrop={handleDrop}
                />
              ),
            )}
        </div>
        {/* Render draggable LetterSegment components */}
        <div className="draggable-container">
          {letterData &&
            letterData.foregroundLettersData.map(
              (letter: any, index: number) => (
                <React.Fragment key={index}>
                  {letter.foregroundletter}
                </React.Fragment>
              ),
            )}
        </div>
      </div>
    </DndProvider>
  );
};
