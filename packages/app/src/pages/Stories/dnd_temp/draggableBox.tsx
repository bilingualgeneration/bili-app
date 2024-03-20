import type { CSSProperties, FC } from 'react'
import { memo, useEffect, useState } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'

import { Box, Letter } from './box'
import { ItemTypes } from './itemTypes'

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export interface DraggableBoxProps {
  id: string
  left: number
  top: number
  audio?: { url: string };
}

export const DraggableBox: FC<DraggableBoxProps> = memo(function DraggableBox(
  props,
) {
    const { id, left, top, audio } = props
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.LETTER,
            item: { id, left, top },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top, audio],
    )

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
    }, [audio]);


    return (
        <div
            ref={drag}
            style={getStyles(left, top, isDragging)}
            role="DraggableBox"
        >
            <Letter />
        </div>
    )
})