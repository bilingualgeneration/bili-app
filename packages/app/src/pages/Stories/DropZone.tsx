import type { FC } from 'react'
import { letters } from './letters';
import { memo, useEffect, useRef, useState } from 'react'
import { useDrop } from "react-dnd";
import { ItemTypes } from '../Stories/dnd_temp/itemTypes';
import { Game } from '../Stories/dnd_temp/Gamification';

import '../Stories/Stories.scss';

interface DropZoneProps {
  index?: number;
  letter?: any;
  expectedLetter?: number;
  dropZoneLetters: string[];
  lastDroppedItem?: any;
  onDrop?: boolean;
}

export const DropZone: FC<DropZoneProps> = memo(function DropZone({
  index,
  letter,
  expectedLetter,
  dropZoneLetters,
  lastDroppedItem,
  onDrop,
}) {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [dropZoneRect, setDropZoneRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (dropZoneRef.current) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      setDropZoneRect(rect);

      // console.log(`DropZone ${index} Coordinates:`);
      // console.log("X: " + rect.left + "px");
      // console.log("Y: " + rect.top + "px");
    }
  }, [index]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: () => ({ name: 'BackgroundLetter' }),
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  }), [])

  return (
    <div ref={dropZoneRef}>
      <div ref={drop} className="drop-target">
          <img src={letters.background_letters[letter]} alt={letter} />
      </div>
      
      {/* TODO: Add correct/incorrect styling */}
      {index === expectedLetter && isOver && !canDrop && (
        <div className="red-shadow" />
      )}
    </div>
  );
});