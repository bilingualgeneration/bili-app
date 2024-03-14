import { FC, useState, useEffect, useRef } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { letters } from "./letters";
import { ItemTypes } from "./ItemTypes";
import "./Stories.scss";

interface LetterAudio {
  url: string;
}

interface LetterSegmentProps {
  id?: string;
  letter: string;
  audio?: LetterAudio;
  index: number;
  onDrop: (index: number) => void;
  correctDrop: boolean;
  left?: number;
  top?: number;
}

export const LetterSegment: FC<LetterSegmentProps> = ({
  id,
  letter,
  audio = { url: "" },
  index,
  onDrop,
  correctDrop,
  left,
  top,
}) => {
  const [play] = useState(new Audio(audio.url));
  const [audioReady, setAudioReady] = useState(false);

  // useDrag hook for draggable letters
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.LETTER,
      item: { id: "letter", index, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, index, left, top],
  );

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

  // Render the draggable letter or return null if dragging
  if (isDragging) {
    return null;
  }

  return (
    <div
      id={`draggable-letter-${index}`}
      ref={drag}
      className="draggable-letter"
      style={{
        cursor: "grab",
        position: "absolute",
        opacity: isDragging ? 0.5 : 1,
      }}
      onDragCapture={handleAudioPlay}
    >
      {letter}
    </div>
  );
};
