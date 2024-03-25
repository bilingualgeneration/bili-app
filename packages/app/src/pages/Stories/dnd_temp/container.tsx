import update from 'immutability-helper';
import type { CSSProperties, FC } from 'react';
import { letters } from '../letters';
import { memo, useCallback, useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useProfile } from "@/contexts/ProfileContext";

import { Game } from './Gamification';
import { LetterMap } from './Gamification';
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

const game = new Game();

export const Container: FC<{ gameData: any }> = memo(function Container({ gameData }) {
    const { isInclusive, isImmersive } = useProfile();
    const [chosenLanguageData] = useFirebaseData(gameData);
    // console.log(chosenLanguageData);

    // Define initialLetterPlacement state and its setter function
    const [initialLetterPlacement, setInitialLetterPlacement] = useState<LetterMap>(game.initialLetterPlacement);

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

    // Generate word dynamically from chosenLanguageData
    const word = chosenLanguageData.map((letter: any) => isInclusive ? letter.esIncText : letter.esText).join('');

    return (
        <div id='stories-dnd'>
            <div className='header-section margin-top-2 margin-bottom-2'>
                {isImmersive && isInclusive ? (
                    <h1 className='text-4xl semibold'>
                        Arrastra y suelta las letras para formar la palabra '{word}'
                    </h1>
                ) : isImmersive ? (
                    <h1 className='text-4xl semibold'>
                        Arrastra y suelta las letras para formar la palabra '{word}'
                    </h1>
                ) : (
                    <h1 className='text-4xl semibold'>
                        Drag and drop the letters to form the word '{word}'
                    </h1>
                )}
                {!isImmersive && (
                    <p className='text-2xl color-english'>
                        Drag and drop the letters to form the word '{word}'
                    </p>
                )}
            </div>

            <div className='game-section'>
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
                        // console.log(key);
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
        </div>
    )
});