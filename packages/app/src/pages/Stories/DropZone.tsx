import type { CSSProperties, FC } from 'react'
import { letters } from './letters';
import { memo, useEffect, useRef, useState } from 'react'
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from '../Stories/dnd_temp/itemTypes';
import { Game } from '../Stories/dnd_temp/Gamification';

import '../Stories/Stories.scss';
import { DragItem } from '../Stories/dnd_temp/interfaces';

interface DropZoneProps {
    index?: number;
    letter?: any;
    expectedLetter?: string;
    dropZoneLetters: string[];
    onDropChange: (letter: string) => void;
}

// instance of Game class
const gameInstance = new Game();

export const DropZone: FC<DropZoneProps> = memo(function DropZone({
    index,
    letter,
    expectedLetter,
    dropZoneLetters,
    onDropChange
}) {
    const dropZoneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dropZoneRef.current) {
        const rect = dropZoneRef.current.getBoundingClientRect();
  
        console.log(`DropZone ${index} Coordinates:`);
        console.log("X: " + rect.left + "px");
        console.log("Y: " + rect.top + "px");
      }
    }, [index]);

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
            <div ref={drop} className="drop-target">
              <img src={letters.background_letters[letter]} alt={letter} />
            </div>
        </div>
    );
});