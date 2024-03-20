import type { FC } from 'react'
import { letters } from './letters';
import { memo } from 'react'
import { useDrop } from "react-dnd";
import { ItemTypes } from '../Stories/dnd_temp/itemTypes';

interface DropZoneProps {
    index?: number;
    letter?: any;
    expectedIndex?: number;
    onDrop?: (index: number, left: number, top: number) => void;
}

export const DropZone: FC<DropZoneProps> = memo(function DropZone({
    index,
    letter,
    expectedIndex,
    onDrop,
}) {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.LETTER,
        drop: () => ({ name: 'BackgroundLetter' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [])

    return (
        <div className={`dropzone`} ref={drop}>
            <div className="drop-target">
                <img src={letters.background_letters[letter]} alt={letter} />
            </div>
            {index === expectedIndex && isOver && !canDrop && (
                <div className="red-shadow" />
            )}
        </div>
    );
});