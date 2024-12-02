import React from "react";
import { useDrop } from "react-dnd";
import "./Stories.scss"; // TODO: is this needed?
import { letters } from "./letters";

interface DropZoneProps {
  index: number;
  letter: any;
  expectedIndex: number;
  onDrop: (index: number) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  letter,
  index,
  onDrop,
  expectedIndex,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "letter",
    drop: (item: any) => onDrop(item.index), // Pass the index of the dropped item
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div className={`dropzone ${isOver && canDrop ? "hovered" : ""}`}>
      <div ref={drop} className="drop-target">
        <img src={letters.background_letters[letter]} alt={letter} />
      </div>
      {/* Add red shadow when hovered over with invalid drop */}
      {index === expectedIndex && isOver && !canDrop && (
        <div className="red-shadow" />
      )}
    </div>
  );
};
