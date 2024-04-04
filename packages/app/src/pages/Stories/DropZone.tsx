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
    onDropChange: (letter: string) => void;
    position: {x: number, y: number};
}

// instance of Game class
const gameInstance = new Game();

export const DropZone: FC<DropZoneProps> = memo(function DropZone({
  index,
  letter,
  top,
  left,
  expectedLetter,
  dropZoneLetters,
  onDropChange,
  position,
}) {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const { x, y } = position;
  console.log(`dropzone x: ${x}, y: ${y} `)

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
        const delta = monitor.getDifferenceFromInitialOffset() as {
            x: number;
            y: number;
        };
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        onDropChange(item.letter);
    },
    collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  }), [onDropChange]);

  return (
    <div ref={dropZoneRef}>
        <div ref={drop} style={{ ...styles, left: x, top: y }} className="drop-target">
          <img className="dropzone-letter" src={letters.background_letters[letter]} alt={letter} />
        </div>
    </div>
  );
});