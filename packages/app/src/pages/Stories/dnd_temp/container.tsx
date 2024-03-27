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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 1300,
    height: 700,
    border: '1px solid black',
    position: 'relative',
    zIndex: 1,
}

interface Audio {
    url: string;
    // Other properties as needed
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

    // Split the letters and shuffle them
    const letterArray = chosenLanguageData.map((letter: any, id: any) => isInclusive ? letter.esIncText : letter.esText);

    // TODO: possibly make a top and bottom row of letters
    // Shuffle and split letters
    const [firstHalf, secondHalf] = game.shuffleAndSplitLetters(
        letterArray.map((letter, index) => ({
            id: `id${index}`,
            esIncText: letter,
            esText: letter,
            esIncAudio: '',
            esAudio: '',
        }))
    );

    const combinedArray = [...firstHalf, ...secondHalf];
    
    // Generate the initialLetterPlacement state once when chosenLanguageData changes
    useEffect(() => {
        // Calculate the width of each letter based on the desired spacing
        const letterWidth = 112;
        // Calculate the total width available for each row
        const totalWidthTop = letterWidth * firstHalf.length;
        const totalWidthBottom = letterWidth * secondHalf.length;
    
        // Calculate the initial left position for each letter in the firstHalf array
        const initialLeftTop = -(totalWidthTop / 2);
        const initialLeftBottom = -(totalWidthBottom / 2);
    
        // Generate the placement for each letter in the firstHalf array
        const newPlacementTop: LetterMap = {};
        firstHalf.forEach((letter, index) => {
            // Add randomness to the left position (range: -20 to 20 pixels)
            const left = initialLeftTop + index * letterWidth + Math.random() * 40 - 20;
            newPlacementTop[letter.id] = { top: 210, left };
        });
    
        // Generate the placement for each letter in the secondHalf array
        const newPlacementBottom: LetterMap = {};
        secondHalf.forEach((letter, index) => {
            // Add randomness to the left position (range: -20 to 20 pixels)
            const left = initialLeftBottom + index * letterWidth + Math.random() * 40 - 20;
            newPlacementBottom[letter.id] = { top: -210, left };
        });
    
        // Merge the placements for both arrays
        const newPlacement = { ...newPlacementTop, ...newPlacementBottom };
    
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
            <div className='game-section' ref={drop}>
                {/* Render dropzone container */}
                <div className='dropzone-container'>
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
                <div className='drag-letters-container' style={styles}>
                    {Object.keys(initialLetterPlacement).map((key) => {
                        const letter = combinedArray.find((letter) => letter.id === key);
                        if (!letter) {
                            console.error(`No letter found for id "${key}"`);
                            return null;
                        }
                        return (
                            <DraggableLetter
                                key={key}
                                id={key}
                                letter={isInclusive ? letter.esIncText : letter.esText}
                                audio={{ url: isInclusive ? letter.esIncAudio : letter.esAudio }}
                                {...initialLetterPlacement[key]}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
});