import React, { FC } from "react";
import { useDrop, XYCoord } from "react-dnd";
import "./Stories.scss";
import { letters } from "./letters";
import { ItemTypes } from "./ItemTypes";
import { LetterSegment } from "./LetterSegment";

interface DropZoneProps {
  index: number;
  letter: any;
  expectedIndex: number;
  onDrop: (index: number, left: number, top: number) => void;
}

export const DropZone: FC<DropZoneProps> = ({
  index,
  letter,
  expectedIndex,
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "letter",
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      // onDrop(index, left, top)
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div className={`dropzone`} ref={drop}>
      <div className="drop-target">
        <img src={letters.background_letters[letter]} alt={letter} />
      </div>
      {/* Add red shadow when hovered over with invalid drop */}
      {index === expectedIndex && isOver && !canDrop && (
        <div className="red-shadow" />
      )}
    </div>
  );
};
