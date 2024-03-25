import update from 'immutability-helper';
import type { CSSProperties, FC } from 'react';
import { letters } from '../letters';
import { memo, useCallback, useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useProfile } from "@/contexts/ProfileContext";

import { DraggableLetter } from './draggableLetter';
import type { DragItem } from './interfaces';
import { ItemTypes } from './itemTypes';
import { DropZone } from '../DropZone';
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
        id0: { top: 250, left: -40 },
        id1: { top: 250, left: 20 },
        id2: { top: 250, left: 70 },
        id3: { top: 250, left: 100 },
        id4: { top: 250, left: 200 },
        id5: { top: 250, left: 150 },
        id6: { top: 250, left: 300 },
    })

    const moveLetters = useCallback(
        (id: string, left: number, top: number) => {
            // Check if the id exists in initialLetterPlacement
            if (!(id in initialLetterPlacement)) {
                console.error(`Invalid id "${id}" provided to moveLetters.`);
                return;
            }
    
            // Update the state using immutability-helper's $merge
            setInitialLetterPlacement(
                update(initialLetterPlacement, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            );
        },
        [initialLetterPlacement],
    );

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

                console.log("Dropped item id:", item.id); 
                moveLetters(item.id, left, top)
                return undefined
            },
        }),
        [moveLetters],
    )

    // const [, drag] = useDrag(
    //     () => ({
    //         type: ItemTypes.LETTER,
    //         item: { type: ItemTypes.LETTER },
    //     }),
    //     []
    // );

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
                 {Object.keys(initialLetterPlacement).map((key) => {
                    const letter = chosenLanguageData.find((letter) => letter.id === key);
                    // console.log(letter);
                    if (!letter) {
                        console.error(`No letter found for id "${key}"`);
                        return null;
                    }
                    console.log(key);
                    return (
                        <DraggableLetter
                            key={key}
                            id={key}
                            letter={isInclusive ? letter.esIncText : letter.esText} 
                            audio={isInclusive ? letter.esIncAudio : letter.esAudio}
                            {...initialLetterPlacement[key]}    
                        />    
                    );
                })}
            </div>
        </div>
    )
});