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
    [key: string]: { top: number; left: number; transform?: string }
}

// Create an instance of the Game class
const gameInstance = new Game();

export const Container: FC<{ gameData: any }> = memo(function Container({ gameData }) {
    const { isInclusive, isImmersive } = useProfile();
    const [chosenLanguageData] = useFirebaseData(gameData);
    const [initialLetterPlacement, setInitialLetterPlacement] = useState<LetterMap>({});
    const [dropZoneLetters, setDropZoneLetters] = useState<string[]>([]);

    gameInstance.updateDropZoneLetters = (letters: string[]) => {
        // Update the state with the new drop zone letters
        setDropZoneLetters(letters);
    };

    // Split the letters and shuffle them
    const letterArray = chosenLanguageData.map((letter: any, id: any) => isInclusive ? letter.esIncText : letter.esText);

    // Shuffle and split letters
    const [firstHalf, secondHalf] = gameInstance.shuffleAndSplitLetters(
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
        // Calculate the width of each letter based on len of word (bigger word = less space)
        let letterWidth = 0;
        if (combinedArray.length <= 8) {
            letterWidth = 200;
        } else {
            letterWidth = 150;
        };
        
        // Calculate the total width available for each row
        const totalWidthTop = letterWidth * firstHalf.length;
        const totalWidthBottom = letterWidth * secondHalf.length;
    
        // Calculate the initial left position for each letter in the firstHalf array
        const initialLeftTop = -(totalWidthTop / 2);
        const initialLeftBottom = -(totalWidthBottom / 2);
    
        // Generate the placement for each letter in the firstHalf array
        const newPlacementTop: LetterMap = {};
        firstHalf.forEach((letter, index) => {
            // Add randomness to the left position (range: -20 to 20 px)
            const left = initialLeftTop + index * letterWidth + Math.random() + 50;
            const top = 210 + (index % 2 === 0 ? 0 : 20); // Shift every other letter down 20px
            newPlacementTop[letter.id] = { top, left  };
        });

        // Generate the placement for each letter in the secondHalf array
        const newPlacementBottom: LetterMap = {};
        secondHalf.forEach((letter, index) => {
            // Add randomness to the left position (range: -20 to 20 px)
            const left = initialLeftBottom + index * letterWidth + Math.random() + 50;
            const top = -250 + (index % 2 === 0 ? 20 : 0); // Shift every other letter up 20px
            newPlacementBottom[letter.id] = { top, left };
        });

    
        // Merge the placements for both arrays
        const newPlacement = { ...newPlacementTop, ...newPlacementBottom };
    
        // Update the state with the new placement object
        setInitialLetterPlacement(newPlacement);
    }, [chosenLanguageData, isInclusive]); // Run only once when component mounts    

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
    const word = letterArray.join('');
    const correctOrder = letterArray;
    // console.log(correctOrder);

    // Define the function to check if the letter is correct
    const isLetterCorrect = (droppedLetter: string, expectedLetter: string): boolean => {
        return droppedLetter === expectedLetter;
    };

    // Define the function to handle drop event
    const handleDrop = (dropIndex: number, item: { id: string; letter: string }): void => {
        const { id, letter } = item;
        const expectedLetter = dropZoneLetters[dropIndex];
        const isCorrect = isLetterCorrect(letter, expectedLetter);
        
        if (isCorrect) {
            replaceDropZoneLetter(dropIndex, id);
        } else if (!dropZoneLetters[dropIndex] || dropZoneLetters[dropIndex] === letter) {
            setDropZoneLetters((prevLetters) => {
                const newLetters = [...prevLetters];
                newLetters[dropIndex] = letter;
                return newLetters;
            });
        }
    };

    // Define the function to replace the DropZone letter with the draggableLetter
    const replaceDropZoneLetter = (dropIndex: number, draggableLetterId: string): void => {
        setDropZoneLetters((prevLetters) => {
            const newLetters = [...prevLetters];
            newLetters[dropIndex] = draggableLetterId;
            return newLetters;
        });
    };

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
                            expectedLetter={correctOrder[index]}
                            dropZoneLetters={dropZoneLetters}
                            onDrop={(item) => handleDrop(index, item)}
                        />
                    ))}
                </div>
                {/* Render draggable letter container */}
                <div className='drag-letters-container' style={styles}>
                    {Object.keys(initialLetterPlacement).map((key, index) => {
                        const letter = combinedArray.find((letter) => letter.id === key);
                        if (!letter) {
                            console.error(`No letter found for id "${key}"`);
                            return null;
                        }
                        return (
                            <DraggableLetter
                                rotation={ index % 2 === 0 ? 15 : -15} 
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
