import React from "react";
import { useDrop } from "react-dnd";

interface DropZoneProps {
  letter: string;
  index: number;
}

export const DropZone: React.FC<DropZoneProps> = ({ letter, index }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "letter",
    drop: (item: any) => console.log(`Dropped ${item.letter} on ${letter}`),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`dropzone ${isOver ? "hovered" : ""}`}>
      {letter}
    </div>
  );
};
