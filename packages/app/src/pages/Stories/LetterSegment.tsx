import React, { FC, useState } from "react";
import { useDrag } from "react-dnd";
import { letters } from "./letters";

interface LetterAudio {
  url: string;
}

interface DragItem {
  type: string;
  letter: string;
  index: number;
}

interface LetterSegmentProps {
  letter: string;
  audio: LetterAudio;
  position: { x: number; y: number };
  index: number;
}

export const LetterSegment: FC<LetterSegmentProps> = ({
  letter,
  audio,
  index,
  position,
}) => {
  const [play] = React.useState(new Audio(audio.url));
  const [audioReady, setAudioReady] = useState(false);

  // useDrag hook for draggable letters
  const [, drag] = useDrag(() => ({
    type: "letter",
    item: { id: "letter", index },
  }));

  // Load audio and handle audio play
  React.useEffect(() => {
    play.load();
    play.addEventListener("canplaythrough", () => {
      setAudioReady(true);
    });
    return () => {
      play.removeEventListener("canplaythrough", () => {
        setAudioReady(false);
      });
    };
  }, [audio.url]);

  // Function to handle audio play
  const handleAudioPlay = () => {
    if (audioReady) {
      play.play();
    }
  };

  return (
    <div
      ref={drag}
      style={{
        cursor: "move",
        position: "absolute",
        left: position?.x || 0,
        top: position?.y || 0,
      }}
      onDragEnter={handleAudioPlay}
    >
      <img src={letters.draggable_letters[letter]} alt={letter} />
    </div>
  );
};
