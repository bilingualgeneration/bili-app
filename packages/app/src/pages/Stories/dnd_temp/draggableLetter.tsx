import type { CSSProperties, FC } from 'react'
import { memo, useEffect, useState } from 'react'
import { DragSourceMonitor, DragPreviewImage, useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Letter } from './letter';
import { ItemTypes } from './itemTypes'
import { useProfile } from '@/contexts/ProfileContext'

function getStyles(
    left: number,
    top: number,
    isDragging: boolean,
): CSSProperties {
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
        // zIndex: '2',
        position: 'absolute',
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    }
}

export interface DraggableLetterProps {
    id: string
    left: number
    top: number
    audio?: { url: string };
    letterData: any;
}

export const DraggableLetter: FC<DraggableLetterProps> = memo(function DraggableLetter(
    props,
)   {
    // console.log('Props in DraggableLetter:', props);
    const { id, left, top, audio, letterData } = props
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.LETTER,
            item: { id, left, top, audio, letterData },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top, audio, letterData],
    )

    // const { isInclusive, isImmersive } = useProfile();

    // console.log(letterData);

    useEffect(() => {
        // Generate empty drag preview image once when component mounts
        preview(getEmptyImage(), { captureDraggingState: true })
    }, []) // Empty dependency array to run the effect only once when mounted

    // const letterText = isInclusive ? letterData.esIncText : letterData.esText;
    // console.log(letters.draggable_letters[letterText]);

    const [audioReady, setAudioReady] = useState(false)

    useEffect(() => {
        if (audio && audio.url) {
            const audioElement = new Audio(audio.url);
            audioElement.load();
            audioElement.addEventListener("canplaythrough", () => {
                setAudioReady(true);
        });
    
            return () => {
                audioElement.removeEventListener("canplaythrough", () => {
                setAudioReady(false);
                });
            };
        }
        // Explicitly return undefined when audio or audio.url is falsy
        return undefined;
    },  [audio]);

    return (
        <div
            ref={drag}
            style={getStyles(left, top, isDragging)}
        >
            <Letter letter={letterData}/>
        </div>
    )
})