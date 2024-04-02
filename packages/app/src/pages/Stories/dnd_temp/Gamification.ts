type LetterTuple = [string, string, string];

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

    public handleDrop(dropIndex: number, item: { id: string; letter: string }): void {
        // Handle the drop event here
        const { id, letter } = item;
        
        // Check if the dropped letter matches the expected letter
        const expectedLetter = ''; // Get the expected letter
        const isCorrect = this.checkLetterCorrect(letter, expectedLetter);
        
        if (!this.dropZoneLetters[dropIndex] || this.dropZoneLetters[dropIndex] === letter) {
            // Replace the drop zone letter with the draggable letter
            this.dropZoneLetters[dropIndex] = letter;
            // Now can implement any UI update or state management as needed
            // For example, if using React, can update state to trigger re-renders
            this.updateDropZoneLetters([...this.dropZoneLetters]);
        }
    }    
}