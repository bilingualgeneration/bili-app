import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { memo, useCallback, useState, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import { useProfile } from "@/contexts/ProfileContext";

import { DraggableBox } from './draggableBox'
import type { DragItem } from './interfaces'
import { ItemTypes } from './itemTypes'
import { DropZone } from '../DropZone'
import { useFirebaseData } from './firebaseUtils';

const styles: CSSProperties = {
    width: 1300,
    height: 800,
    border: '1px solid black',
    position: 'relative',
    zIndex: 1,
}

interface BoxMap {
    [key: string]: { top: number; left: number }
}

export const Container: FC<{ gameData: any }> = memo(function Container({ gameData }) {
    const { isInclusive, isImmersive } = useProfile();
    const [boxes, setBoxes] = useState<BoxMap>({
        c: { top: 250, left: 100 },
    })

    const [chosenLanguageData] = useFirebaseData(gameData);

    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [boxes],
    )

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.LETTER,
            drop(item: DragItem, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset() as {
                    x: number
                    y: number
                }

                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)

                moveBox(item.id, left, top)
                return undefined
            },
        }),
        [moveBox],
    )

    return (
        <div id='stories-dnd'>
            <div className='dropzone-container'>
                {chosenLanguageData.map((letter: any, index: number) => (
                    <DropZone
                        key={index}
                        letter={isInclusive ? letter.esIncText : letter.esText}
                        index={index}
                        expectedIndex={index}           
                    />
                ))}
            </div>
            <div ref={drop} style={styles}>
                {Object.keys(boxes).map((key) => (
                    <DraggableBox
                        key={key}
                        id={key}
                        {...(boxes[key] as { top: number; left: number } )}                    
                    />
                ))}
            </div>
        </div>
    )
});