export class Game {
    public shuffleAndSplitLetters(letters: Array<{ id: string; esIncText: string; esText: string; esIncAudio: string; esAudio: string }>): [Array<{ id: string; esIncText: string; esText: string; esIncAudio: string; esAudio: string }>, Array<{ id: string; esIncText: string; esText: string; esIncAudio: string; esAudio: string }>] {
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