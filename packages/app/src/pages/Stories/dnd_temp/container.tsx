import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { memo, useCallback, useState, useMemo } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { useProfile } from "@/contexts/ProfileContext";

import { DraggableLetter } from './draggableLetter'
import type { DragItem } from './interfaces'
import { ItemTypes } from './itemTypes'
import { DropZone } from '../DropZone'
import { useFirebaseData } from './firebaseUtils';

import '../Stories.scss';

const styles: CSSProperties = {
    width: 1300,
    height: 800,
    border: '1px solid black',
    position: 'relative',
    zIndex: 1,
}

interface LetterMap {
    [key: string]: { top: number; left: number }
}

export const Container: FC<{ gameData: any }> = memo(function Container({ gameData }) {
    const { isInclusive, isImmersive } = useProfile();
    const [chosenLanguageData] = useFirebaseData(gameData);

    const [initialLetterPlacement, setInitialLetterPlacement] = useState<LetterMap>({
        a: { top: 20, left: 80 },
        b: { top: 250, left: 100 },
        c: { top: 150, left: 100 },
        d: { top: 200, left: 100 },
        e: { top: 250, left: 200 },
        f: { top: 250, left: 150 },
        g: { top: 250, left: 300 },
    })

    

    const moveLetters = useCallback(
        (id: string, left: number, top: number) => {
            setInitialLetterPlacement(
                update(initialLetterPlacement, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [initialLetterPlacement],
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

                moveLetters(item.id, left, top)
                return undefined
            },
        }),
        [moveLetters],
    )

    const [, drag] = useDrag(
        () => ({
            type: ItemTypes.LETTER,
            item: { type: ItemTypes.LETTER },
        }),
        []
    );

    return (
        <div id='stories-dnd'>
            <div className='dropzone-container' ref={drop}>
                {chosenLanguageData.map((letter: any, index: number) => (
                    <DropZone
                        key={index}
                        letter={isInclusive ? letter.esIncText : letter.esText}
                        index={index}
                        expectedIndex={index} 
                        accept={[]} 
                        onDrop={function (item: any): void
                        {
                            throw new Error('Function not implemented.');
                        } }                   
                    />
                ))}
            </div>
            <div className='draggable-container'>
                {chosenLanguageData.map((letter: any, index: number) => (
                    <DraggableLetter
                        key={index}
                        id={letter.id}
                        letterData={letter} 
                        {...initialLetterPlacement[letter.id]}
                    />
                ))}
            </div>
        </div>
    )
});