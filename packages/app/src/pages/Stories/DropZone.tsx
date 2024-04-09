import type { CSSProperties, FC } from 'react';
import { letters } from './letters';
import { memo, useEffect, useRef, useState } from 'react';
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from '../Stories/dnd_temp/itemTypes';
import { Game } from '../Stories/dnd_temp/Gamification';

import '../Stories/Stories.scss';
import { DragItem } from '../Stories/dnd_temp/interfaces';

// Define CSS styles for the dropzone letters
const styles: CSSProperties = {
  position: 'absolute',
  zIndex: 2,
}

interface DropZoneProps {
    index?: number;
    letter?: any;
    top?: number;
    left?: number;
    expectedLetter?: string;
    dropZoneLetters: string[];
    onDrop: (letter: string) => void;
    onDropChange?: (letter: string) => void;
    position: {x: number, y: number};
}

export const DropZone: FC<DropZoneProps> = memo(function DropZone({
  index,
  letter,
  top,
  left,
  expectedLetter,
  dropZoneLetters,
  onDrop,
  onDropChange,
  position,
}) {
  const { x, y } = position;
  // console.log(`dropzone x: ${x}, y: ${y} `)

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
      };

      const droppedLetter = item.letter;
      const gridSize = 1300;
      
      if (droppedLetter === expectedLetter) {
        // Calculate snapped position based on grid size
        const snappedX = Math.round((item.left + delta.x - x) / gridSize) * gridSize + x;
        const snappedY = Math.round((item.top + delta.y - y) / gridSize) * gridSize + y;
        console.log('correct drop!')

        // Update position of dropped letter
        onDrop(expectedLetter);
      } else {
        console.log('incorrect')
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  }), [onDrop, expectedLetter, x, y]);

  return (
    <div>
        <div ref={drop} style={{ ...styles, left: x, top: y }} className="drop-target">
          <img className="dropzone-letter" src={letters.background_letters[letter]} alt={letter} />
        </div>
    </div>
  );
});