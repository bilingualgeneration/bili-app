import update from 'immutability-helper';
import type { CSSProperties, FC } from 'react';
import { memo, useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useProfile } from "@/contexts/ProfileContext";

import { Game } from './Gamification';
import { DraggableLetter } from './draggableLetter';
import type { DragItem } from './interfaces';
import { ItemTypes } from './itemTypes';
import { DropZone } from '../DropZone';
import { useFirebaseData } from './firebaseUtils';

import '../Stories.scss';
import { Letter } from './letter';

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

interface DropPosition {
    char: string;
    x: number;
    y: number;
}

interface Audio {
    url: string;
}

interface LetterMap {
    [key: string]: { top: number; left: number; transform?: string }
}

// Create an instance of the Game class
const gameInstance = new Game();

export const Container: FC<{ gameData: any }> = memo(function Container({ gameData }) {
    const { isInclusive, isImmersive } = useProfile();
    const [chosenLanguageData] = useFirebaseData(gameData);
    const [initialLetterPlacement, setInitialLetterPlacement] = useState<LetterMap>({});
    const [dropzonePlacement, setDropzonePlacement] = useState<DropPosition[]>([]);
    const [dropZoneLetters, setDropZoneLetters] = useState<string[]>([]);
    const dropzoneRef = useRef<HTMLDivElement>(null);
    const [droppedLetter, setDroppedLetter] = useState<string>('');
    const [expectedLetter, setExpectedLetter] = useState<string>('');
    const [isLetterCorrect, setIsLetterCorrect] = useState<boolean>();

    const letterArray = chosenLanguageData.map((letter: any) => isInclusive ? letter.esIncText : letter.esText);

    const extractedData = chosenLanguageData.map(item => {
        const letter = isInclusive ? item.esIncText : item.esText;
        const audioUrl = isInclusive ? item.esIncAudio?.url : item.esAudio?.url;

        return {
            id: item.id,
            letter: letter || '', // Set a default value if letter is undefined
            audioUrl: audioUrl || '' // Set a default value if audioUrl is undefined
        };
    });

    // Shuffle and split letters
    const [firstHalf, secondHalf] = gameInstance.shuffleAndSplitLetters(extractedData);

    const combinedArray = useMemo(() => {
        const [firstHalf, secondHalf] = gameInstance.shuffleAndSplitLetters(extractedData);
        return [...firstHalf, ...secondHalf].map(([id, letter, audioUrl]) => ({ id, letter, audioUrl }));
    }, [extractedData]);

    // Generate the dropzone placement state once when chosenLanguageData changes
    useEffect(() => {
        // Calculate the width of each letter based on len of word (bigger word = less space)
        let letterWidth = 0;
        if (combinedArray.length <= 8) {
            letterWidth = 200;
        } else {
            letterWidth = 150;
        };

        const dropzoneLetterWidth = 100;

        const calculateDropPositions = () => {
            const containerWidth = 1300;
            const containerHeight = 700;
            const desiredSpacing = 5;
            const dropzoneLetterWidth = 100;
        
            // Calculate total width of all characters and spacing
            const totalWidthCharacters = dropzoneLetterWidth * letterArray.length;
            const totalWidthSpacing = desiredSpacing * (letterArray.length - 1);
            const totalWidth = totalWidthCharacters + totalWidthSpacing;
        
            // Calculate starting X position to center the characters
            const startX = (containerWidth - totalWidth) / 2;
            const startY = (containerHeight - 154) / 2; // Center vertically with respect to letter height
        
            const positions: DropPosition[] = [];
            let currentX = startX;
        
            // Loop through each character and position it accordingly
            for (let i = 0; i < letterArray.length; i++) {
                let currentLetterWidth = dropzoneLetterWidth;
        
                // Adjust the position of 'i' to make it more centered based on width
                if (letterArray[i] === 'i') {
                    currentLetterWidth = 37; // Width of the 'i' character
                }
        
                const adjustment = (dropzoneLetterWidth - currentLetterWidth) / 2;
        
                positions.push({ char: letterArray[i], x: currentX + adjustment, y: startY });
                currentX += dropzoneLetterWidth + desiredSpacing;
            }
        
            return positions;
        }

        setDropzonePlacement(calculateDropPositions())
        
        // Calculate the total width available for each row
        const totalWidthTop = letterWidth * firstHalf.length;
        const totalWidthBottom = letterWidth * secondHalf.length;

        // Calculate the initial left position for each letter in the firstHalf array
        const initialLeftTop = -(totalWidthTop / 2);
        const initialLeftBottom = -(totalWidthBottom / 2);
        
        // Convert LetterTuple arrays to the desired type
        const firstHalfData: { id: string; letter: string; audioUrl: string }[] = firstHalf.map(([id, letter, audioUrl]) => ({ id, letter, audioUrl }));
        const secondHalfData: { id: string; letter: string; audioUrl: string }[] = secondHalf.map(([id, letter, audioUrl]) => ({ id, letter, audioUrl }));

        // Generate the placement for each letter in the firstHalf array
        const newPlacementTop: LetterMap = {};
        firstHalfData.forEach((item, index) => {
            // Add randomness to the left position (range: -20 to 20 px)
            const left = initialLeftTop + index * letterWidth + Math.random() + 50;
            const top = 170 + (index % 2 === 0 ? 0 : 20); // Shift every other letter down 20px
            newPlacementTop[item.id] = { top, left };
        });

        // Generate the placement for each letter in the secondHalf array
        const newPlacementBottom: LetterMap = {};
        secondHalfData.forEach((item, index) => {
            // Add randomness to the left position (range: -20 to 20 px)
            const left = initialLeftBottom + index * letterWidth + Math.random() + 50;
            const top = -330 + (index % 2 === 0 ? 20 : 0); // Shift every other letter up 20px
            newPlacementBottom[item.id] = { top, left };
        });

        // Merge the placements for both arrays
        const newPlacement = { ...newPlacementTop, ...newPlacementBottom };

        // Update the state with the new placement object
        setInitialLetterPlacement(newPlacement);
    }, [chosenLanguageData, isInclusive]);

    // Drop handler for DropZone
    const handleSuccessDrop = (letter: string, left: number, top: number) => {
        setExpectedLetter(letter);
    };

    // Generate word dynamically from previously created array
    const word = letterArray.join('');

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
            <div style={styles}>
                {/* Render dropzone letters */}
                <div>
                    {dropzonePlacement.map(({ char, x, y }, index) => (
                        <DropZone
                            key={index}
                            letter={char}
                            index={index}
                            expectedLetter={char}
                            dropZoneLetters={dropZoneLetters}
                            // onSuccessDrop={handleSuccessDrop}
                            position={{ x, y }} 
                            onDrop={char}                        
                        />
                    ))}
                </div>  

                {/* Render draggable letters */}
                <div >
                    {Object.entries(initialLetterPlacement).map(([id, { top, left }]: [string, { top: number; left: number }], index) => {
                        const letter = combinedArray.find(item => item.id === id);
                        if (!letter) {
                            console.error(`No letter found for id "${id}"`);
                            return null;
                        }
                        const { letter: letterText, audioUrl } = letter;
                        return (
                            <DraggableLetter
                                rotation={index % 2 === 0 ? 15 : -15}
                                key={id}
                                id={id}
                                letter={letterText}
                                audio={{ url: audioUrl }}
                                top={top}
                                left={left}
                            />
                        );
                    })}
                </div>       
            </div>
        </div>
    );
});