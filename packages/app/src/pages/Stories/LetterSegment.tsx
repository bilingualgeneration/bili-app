import { FC, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { letters } from "./letters";

interface LetterAudio {
  url: string;
}

interface LetterSegmentProps {
  letter: string;
  audio?: LetterAudio;
  position: { x: number; y: number };
  index: number;
}

export const LetterSegment: FC<LetterSegmentProps> = ({
  letter,
  audio = { url: "" },
  index,
  position,
}) => {
  const [play] = useState(new Audio(audio.url));
  const [audioReady, setAudioReady] = useState(false);

  // useDrag hook for draggable letters
  const [, drag] = useDrag(() => ({
    type: "letter",
    item: { id: "letter", index },
  }));

  // Load audio and handle audio play
  useEffect(() => {
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
        cursor: "grab",
        position: "absolute",
        left: position?.x || 0,
        top: position?.y || 0,
      }}
      onDragCapture={handleAudioPlay}
    >
      <img src={letters.draggable_letters[letter]} alt={letter} />
    </div>
  );
};
