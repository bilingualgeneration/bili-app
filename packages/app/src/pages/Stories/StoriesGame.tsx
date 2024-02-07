import React, { FC, useEffect, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { LetterSegment } from "./LetterSegment";
import { DropZone } from "./DropZone";

import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import { IonText } from "@ionic/react";

interface LetterImage {
  url: string;
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

export const StoriesGame: FC<StoriesGameProps> = ({ game: data }) => {
  const { isImmersive } = useProfile();

  const audio_correct = new Audio(correct_card_audio);
  const audio_incorrect = new Audio(incorrect_card_audio);

  // const instruction_es = new Audio(instruction_es_audio);
  // const instruction_en = new Audio(instruction_en_audio);

  // useEffect(() => {
  //   if (!isImmersive) {
  //     instruction_es.onended = () => {
  //       instruction_en.play();
  //     };
  //   }
  //   instruction_es.play();
  // }, []);

  const correctStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    border: "8.4px solid var(--alerts-status-success, #12D18E)",
    boxShadow: "0px 8.4px 25.2px 0px #12D18E",
  };

  const incorrectStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    border: "8.4px solid var(--Categories-Error, #F0091B)",
    boxShadow: "0px 8.4px 25.2px 0px #F0091B",
  };

  // const [letterColors, setLetterColors] = useState<any>({
  //   "1": initialStyle,
  //   "2": initialStyle,
  //   "3": initialStyle,
  // });

  const [wordData, setWordData] = useState<any>(null); // State to store word data from Firebase

  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const goToNextStoriesPage = () => {
    // Check if the current index is at the last element of the dnd_letters array
    if (currentIndex >= data.dnd_letters.length - 1) {
      setCurrentIndex(0); // Reset to the first element
    } else {
      setCurrentIndex(currentIndex + 1); // Move to the next element
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      // Transform data to include both background letter, draggable letter, & audio
      const lettersGroup = data.dnd_letters.map((letterItem: any) => {
        return {
          image_background: letterItem.image_background.url,
          image_foreground: letterItem.image_foreground.url,
          audio: letterItem.audio.url,
        };
      });
      setWordData(lettersGroup);
    }
  }, [data]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="stories-dnd">
        <IonText>
          <h1>Arrastra y suelta las letras para formar la palabra "amigos".</h1>
          {!isImmersive && (
            <p>Drag and drop the letters to form the word "amigos."</p>
          )}
        </IonText>
        <div className="letter-container">
          {wordData && (
            <div className="game-container">
              <div className="dropzone-container">
                {wordData.dropZone.map((letter: string, index: number) => (
                  <DropZone key={index} letter={letter} index={index} />
                ))}
              </div>
              <div className="draggable-container">
                {wordData.draggable.map((letter: string, index: number) => (
                  <LetterSegment key={index} letter={letter} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};
