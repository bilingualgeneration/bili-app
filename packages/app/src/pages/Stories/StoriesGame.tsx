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

interface StoriesGameData {
  letter: string;
  correctLetter: string;
}

interface StoriesGameProps {
  storiesGameData: StoriesGameData[];
}

export const StoriesGame: FC<StoriesGameProps> = ({ storiesGameData }) => {
  const { isImmersive } = useProfile();

  const audio_correct = new Audio(correct_card_audio);
  const audio_incorrect = new Audio(incorrect_card_audio);

  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  const ref = doc(firestore, "stories-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);

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
      // Transform data to include both background letter and draggable letter
      const lettersGroup = data.dnd_letters.map((letterItem: any) => {
        return {
          backdropSegment: letterItem.letter.filter(
            (x: any) => x.image_background === "es",
          )[0].text,
          draggableSegment: letterItem.letter.filter(
            (x: any) => x.image_foreground === "en",
          )[0].text,
        };
      });

      setWordData(lettersGroup);
    }
  }, [data]);

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50vh" }}>Loading...</div>
    );
  }

  if (status === "error") {
    return "Error loading the game";
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Drag and Drop Game</h1>
        {wordData && (
          <div className="game-container">
            <div className="dropzone-container">
              {wordData.dropZone.map((letter: string, index: number) => (
                <DropZone key={index} letter={letter} index={index} />
              ))}
            </div>
            <div className="draggable-container">
              {wordData.draggable.map((letter: string, index: number) => (
                <LetterSegment key={index} letter={letter} dropzoneColor={""} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};
