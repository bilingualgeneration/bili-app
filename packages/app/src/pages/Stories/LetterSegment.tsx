import React, { useState } from "react";
import { useDrag } from "react-dnd";

interface DragItem {
  type: string;
  letter: string;
  index: number;
}

interface LetterSegmentProps {
  letter: any;
  width: number;
  height: number;
  position: { x: number; y: number };
  index: number;
  onDrop: (index: number) => void;
}

export const LetterSegment: React.FC<LetterSegmentProps> = ({
  letter,
  width,
  height,
  position,
  index,
  onDrop,
}) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  // Use useDrag hook to make the letter segment draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "letter",
    item: { type: "letter", letter: letter.props.alt, index },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`letter-segment ${!isCorrect ? "incorrect" : ""}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isDragging ? 0.5 : 1,
        pointerEvents: isDragging ? "none" : "auto",
      }}
    >
      {letter}
    </div>
  );
};
