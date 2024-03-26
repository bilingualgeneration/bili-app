import update from 'immutability-helper';
import type { CSSProperties, FC } from 'react';
import { memo, useCallback, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useProfile } from "@/contexts/ProfileContext";

import { Game } from './Gamification';
import { DraggableLetter } from './draggableLetter';
import type { DragItem } from './interfaces';
import { ItemTypes } from './itemTypes';
import { DropZone } from '../DropZone';
import { useFirebaseData } from './firebaseUtils';

import '../Stories.scss';

// Define CSS styles for the container
const styles: CSSProperties = {
    width: 1300,
    height: 800,
    border: '1px solid black',
    position: 'relative',
    zIndex: 1,
}

// Define the interface for the LetterMap
interface LetterMap {
    [key: string]: { top: number; left: number }
}

// Create an instance of the Game class
const game = new Game();

export const Container: FC<{ gameData: any }> = memo(function Container({ gameData }) {
    const { isInclusive, isImmersive } = useProfile();
    const [chosenLanguageData] = useFirebaseData(gameData);
    const [initialLetterPlacement, setInitialLetterPlacement] = useState<LetterMap>({});

    // Generate the initialLetterPlacement state once when chosenLanguageData changes
    useEffect(() => {
        // Initialize a new placement object
        const newPlacement: LetterMap = {};

        // Split the letters and shuffle them
        const letterArray = chosenLanguageData.map((letter: any) => isInclusive ? letter.esIncText : letter.esText);
        const [firstHalf, secondHalf] = game.shuffleAndSplitLetters(letterArray);
        const combinedArray = [...firstHalf, ...secondHalf];
        console.log(combinedArray);

         // Calculate the width of each letter based on the number of letters
        const letterWidth = 1300 / combinedArray.length;
        // console.log(letterWidth);
        
        // Generate the placement for each letter
        combinedArray.forEach((letter, index) => {
            console.log(index);
            // Calculate the left position based on the index and letter width
            const left = index * letterWidth;
            console.log(left, letter);
            // Set the top position to -250
            newPlacement[`id${index}`] = { top: -250, left };
        });
        // Update the state with the new placement object
        setInitialLetterPlacement(newPlacement);
    }, [chosenLanguageData, isInclusive]);

    // Define the moveLetters callback function
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

    // Define the drop handler for the DropZone
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.LETTER,
            drop(item: DragItem, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset() as {
                    x: number;
                    y: number;
                };
                let left = Math.round(item.left + delta.x);
                let top = Math.round(item.top + delta.y);
                
                moveLetters(item.id, left, top);
                return undefined;
            },
        }),
        [moveLetters],
    );

    // Generate word dynamically from previously created array
    const word = chosenLanguageData.map((letter: any) => isInclusive ? letter.esIncText : letter.esText).join('');

    return (
        <div id='stories-dnd'>
            {/* Render header section */}
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

            {/* Render game section */}
            <div className='game-section'>
                {/* Render dropzone container */}
                <div className='dropzone-container' ref={drop}>
                    {chosenLanguageData.map((letter: any, index: number) => (
                        <DropZone
                            key={index}
                            letter={isInclusive ? letter.esIncText : letter.esText}
                            index={index}
                            expectedIndex={index}
                            accept={[]}
                            onDrop={() => {}} // Placeholder function
                        />
                    ))}
                </div>
                {/* Render draggable letter container */}
                <div>
                    {Object.keys(initialLetterPlacement).map((key) => {
                        const letter = chosenLanguageData.find((letter) => letter.id === key);
                        if (!letter) {
                            console.error(`No letter found for id "${key}"`);
                            return null;
                        }
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
    );
});
