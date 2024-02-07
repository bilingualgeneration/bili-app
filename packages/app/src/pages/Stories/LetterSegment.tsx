import React, { useState } from "react";
import { useDrag, DragSourceMonitor, DragSourceHookSpec } from "react-dnd";

interface DragItem {
  type: string;
  letter: string;
}

interface LetterSegmentProps {
  letter: string;
}

export const LetterSegment: React.FC<LetterSegmentProps> = ({ letter }) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  const handleDragStart = () => {
    setIsCorrect(false); // Assume letter is incorrect when dragging starts
  };

  const [{ isDragging }, drag] = useDrag<
    DragSourceHookSpec<DragItem, unknown, { isDragging: boolean }>,
    unknown,
    { isDragging: boolean }
  >({
    type: "letter",
    item: { type: "letter", letter } as DragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`letter-segment ${!isCorrect ? "incorrect" : ""}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        boxShadow: !isCorrect ? "0 0 10px red" : "none",
        color: "#DFD3BB",
      }}
      draggable
      onDragStart={handleDragStart}
    >
      {letter}
    </div>
  );
};
