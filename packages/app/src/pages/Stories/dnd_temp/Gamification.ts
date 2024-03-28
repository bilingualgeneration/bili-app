export class Game {
    private dropZoneLetters: string[] = [];
    public updateDropZoneLetters!: ((letters: string[]) => void);

    public shuffleAndSplitLetters(letters: Array<{ id: string; esIncText: string; esText: string; esIncAudio: string; esAudio: string }>): [Array<{ id: string; esIncText: string; esText: string; esIncAudio: string; esAudio: string }>, Array<{ id: string; esIncText: string; esText: string; esIncAudio: string; esAudio: string }>] {
        // Create a copy of input array to avoid mutating original array
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

    public isLetterCorrect(droppedLetter: string, expectedLetter: string): boolean {
        // Compare the dropped letter with the expected letter
        return droppedLetter === expectedLetter;
    }

    public handleDrop(dropIndex: number, item: { id: string; letter: string }): void {
        // Handle the drop event here
        const { id, letter } = item;
        
        // Check if the dropped letter matches the expected letter
        const expectedLetter = ''; // Get the expected letter
        const isCorrect = this.isLetterCorrect(letter, expectedLetter);
        
        if (!this.dropZoneLetters[dropIndex] || this.dropZoneLetters[dropIndex] === letter) {
            // Replace the drop zone letter with the draggable letter
            this.dropZoneLetters[dropIndex] = letter;
            // Now can implement any UI update or state management as needed
            // For example, if using React, can update state to trigger re-renders
            this.updateDropZoneLetters([...this.dropZoneLetters]);
        }
    }

    public replaceDropZoneLetter(dropIndex: number, draggableLetterId: string): void {
        // Find the index of the draggable letter by its id
        const draggableIndex = this.dropZoneLetters.findIndex(letter => letter === draggableLetterId);
        if (draggableIndex !== -1) {
            // Replace the drop zone letter with the draggable letter
            this.dropZoneLetters[dropIndex] = this.dropZoneLetters[draggableIndex];
            // Clear the draggable letter from its original position
            this.dropZoneLetters[draggableIndex] = '';
            // Now can implement any UI update or state management as needed
            // For example, if using React, can update state to trigger re-renders
            this.updateDropZoneLetters([...this.dropZoneLetters]);
        }
    }
}