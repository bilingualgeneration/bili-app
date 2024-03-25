
export type LetterMap = {
    [key: string]: { top: number; left: number };
};

export class Game {
    public initialLetterPlacement: LetterMap;

    constructor() {
        this.initialLetterPlacement = this.determineInitialLetterPlacement();
    }

    private determineInitialLetterPlacement(): LetterMap {
        // Logic to determine initial letter placement
        return {
          id0: { top: -250, left: -40 },
          id1: { top: 250, left: 20 },
          id2: { top: 250, left: 70 },
          id3: { top: 250, left: 100 },
          id4: { top: 250, left: 200 },
          id5: { top: 250, left: 150 },
          id6: { top: 250, left: 300 },
        };
    }

    public shuffleAndSplitLetters(letters: string[]): [string[], string[]] {
        // Create a copy of the input array to avoid mutating the original array
        const shuffledLetters = [...letters];
        
        // Use Fisher-Yates/Durstenfeld shuffle algorithm
        for (let i = shuffledLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if (i !== j) {
                // Swap elements at indices i and j
                [shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]];
            }
        }
        
        // Calculate the midpoint index to split the array
        const midpoint = Math.floor(shuffledLetters.length / 2);
        
        // Split the shuffled array into two halves
        const firstHalf = shuffledLetters.slice(0, midpoint);
        const secondHalf = shuffledLetters.slice(midpoint);
        
        // Return the two halves as a tuple
        return [firstHalf, secondHalf];
    }    
}