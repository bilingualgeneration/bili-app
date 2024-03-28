import type { FC } from 'react'
import { letters } from './letters';
import { memo, useState } from 'react'
import { useDrop } from "react-dnd";
import { ItemTypes } from '../Stories/dnd_temp/itemTypes';

interface DropZoneProps {
  index?: number;
  letter?: any;
  expectedIndex?: number;
  accept: string[];
  lastDroppedItem?: any;
  onDrop: (item: any, isCorrect: boolean) => void;
}

export const DropZone: FC<DropZoneProps> = memo(function DropZone({
  index,
  letter,
  expectedIndex,
  accept,
  lastDroppedItem,
  onDrop,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: () => ({ name: 'BackgroundLetter' }),
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  }), [])

  return (
    <div ref={drop}>
      <div className="drop-target">
          <img src={letters.background_letters[letter]} alt={letter} />
      </div>
      
      {/* TODO: Add correct/incorrect styling */}
      {index === expectedIndex && isOver && !canDrop && (
        <div className="red-shadow" />
      )}
    </div>
  );
});