import type { CSSProperties, FC } from 'react'
import { memo, useEffect, useState } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { letters } from '../letters';
import { Letter } from './letter';
import { ItemTypes } from './itemTypes'
import { useAudioManager } from '@/contexts/AudioManagerContext';

function getStyles(
    left: number,
    top: number,
    isDragging: boolean,
): CSSProperties {
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
        position: 'absolute',
        zIndex: 2,
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    }
}

export interface Audio {
    url: string;
}

export interface DraggableLetterProps {
    id: string
    left: number
    top: number
    audio?: Audio;
    letter: any;
}

export const DraggableLetter: FC<DraggableLetterProps> = memo(function DraggableLetter(
    props,
)   {
    const { id, left, top, audio, letter } = props
    const { addAudio, clearAudio } = useAudioManager();

    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.LETTER,
            item: { id, left, top, audio, letter },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top, audio, letter],
    )

    useEffect(() => {
        // Generate empty drag preview image once when component mounts
        preview(getEmptyImage(), { captureDraggingState: true })
    }, []) // Empty dependency array to run the effect only once when mounted

    useEffect(() => {
        if (isDragging && audio?.url) {
            addAudio([audio.url]);
        } else {
            clearAudio();
        }
    }, [isDragging, audio]);

    return (
        <div
            ref={drag}
            style={getStyles(left, top, isDragging)}
        >
            <Letter letter={letter}/>
        </div>
    )
})