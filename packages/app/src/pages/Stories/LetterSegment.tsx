import { FC, useState, useEffect, useRef } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { letters } from "./letters";
import "./Stories.scss";

interface LetterAudio {
  url: string;
}

interface LetterSegmentProps {
  letter: string;
  audio?: LetterAudio;
  index: number;
  onDrop: (index: number) => void;
  correctDrop: boolean;
}

export const LetterSegment: FC<LetterSegmentProps> = ({
  letter,
  audio = { url: "" },
  index,
  onDrop,
  correctDrop,
}) => {
  const [play] = useState(new Audio(audio.url));
  const [audioReady, setAudioReady] = useState(false);
  const [draggedOver, setDraggedOver] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // useDrag hook for draggable letters
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "letter",
    item: { id: "letter", index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
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

  // Update position to overlap the background letter upon correct drop
  useEffect(() => {
    if (correctDrop) {
      const dropZone = document.querySelector(`#dropzone-${index}`);
      const dropZoneRect = dropZone?.getBoundingClientRect();
      const dropZoneCenterX = dropZoneRect
        ? dropZoneRect.x + dropZoneRect.width / 2
        : 0;
      const dropZoneCenterY = dropZoneRect
        ? dropZoneRect.y + dropZoneRect.height / 2
        : 0;

      // Position the draggable letter to overlap the background letter
      const draggableLetter = document.querySelector(
        `#draggable-letter-${index}`,
      ) as HTMLElement;
      if (draggableLetter) {
        draggableLetter.style.left = `${
          dropZoneCenterX - draggableLetter.clientWidth / 2
        }px`;
        draggableLetter.style.top = `${
          dropZoneCenterY - draggableLetter.clientHeight / 2
        }px`;
        setDraggedOver(true);
      }
    }
  }, [correctDrop]);

  useEffect(() => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const letterSize = 50;

    const randomPosition = () => {
      // Calculate random positions within the specified area around the background letters
      const randomX =
        Math.floor(Math.random() * (containerWidth - 2 * letterSize)) +
        letterSize;
      const randomY =
        Math.floor(Math.random() * (containerHeight - 2 * letterSize)) +
        letterSize;

      setPosition({ x: randomX, y: randomY });
    };

    randomPosition();
  }, []);

  return (
    <div
      id={`draggable-letter-${index}`}
      ref={drag}
      className="draggable-letter"
      style={{
        cursor: "grab",
        position: "absolute",
        left: position.x,
        top: position.y,
        opacity: isDragging ? 0.5 : 1,
        zIndex: draggedOver ? 1 : 0,
      }}
      onDragCapture={handleAudioPlay}
    >
      <DragPreviewImage
        connect={preview}
        src={letters.draggable_letters[letter]}
      />
      <img src={letters.draggable_letters[letter]} alt={letter} />
    </div>
  );
};
