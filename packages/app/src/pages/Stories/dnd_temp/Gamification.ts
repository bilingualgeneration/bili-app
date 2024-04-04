type LetterTuple = [string, string, string];

type CharPosition = {
    char: string;
    x: number;
    y: number;
};
  
  type DraggableLetter = CharPosition & {
    id: string;
};

export class Game {
    private dropZoneLetters: string[] = [];
    public updateDropZoneLetters!: ((letters: string[]) => void);

    public shuffleAndSplitLetters(data: { id: string; letter: string; audioUrl: string }[]): [LetterTuple[], LetterTuple[]] {
        // Create a copy of the input array to avoid mutating the original array
        const shuffledData = [...data];
    
        // Use Fisher-Yates/Durstenfeld shuffle algorithm
        for (let i = shuffledData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Durstenfeld if stmt
            if (i !== j) {
                // Swap elements at indices i and j
                [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
            }
        }
    
        // Calculate the midpoint index to split the array
        const midpoint = Math.floor(shuffledData.length / 2);
    
        // Split the shuffled array into two halves
        const firstHalf = shuffledData.slice(0, midpoint);
        const secondHalf = shuffledData.slice(midpoint);
    
        // Return the two halves of data as tuples containing ID, letter, and audio URL
        const firstHalfData: [string, string, string][] = firstHalf.map(item => [item.id, item.letter, item.audioUrl]);
        const secondHalfData: [string, string, string][] = secondHalf.map(item => [item.id, item.letter, item.audioUrl]);
    
        // Return the two halves of data as tuples
        return [firstHalfData, secondHalfData];
    }               

    public checkLetterCorrect(droppedLetter: string, expectedLetter: string): boolean {
        // Compare the dropped letter with the expected letter
        return droppedLetter === expectedLetter;
    }  

    // public calculateCharPositionsAndLetters(word: string): { charPositions: CharPosition[], draggableLetters: DraggableLetter[] } {
    //     const containerWidth = 1300;
    //     const containerHeight = 700;
    //     const spaceBetweenChars = 5; // Gap between characters in pixels
        
    //     const totalLetterWidth = letterWidth * letterArray.length;
    //     const startX = (containerWidth - totalLetterWidth - (spaceBetweenChars * (letterArray.length - 1))) / 2;
    //     const startY = containerHeight / 2; // Center vertically
    
    //     const positions: DropPosition[] = [];
    //     let currentX = startX;
    
    //     for (let i = 0; i < letterArray.length; i++) {
    //         positions.push({ char: letterArray[i], x: currentX, y: startY });
    //         currentX += letterWidth + spaceBetweenChars;
    //     }
        
    //     return positions;
    // }
}