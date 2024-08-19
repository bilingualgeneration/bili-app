import { Attempt, GameData } from "@/pages/Stories/StoryContext";

const MAX_POINTS = 10;

export const calculatePoints = (
  mistakes: number,
  totalPossibleMistakes: number,
): number => {
  if (mistakes === 0) {
    return 10; // 0 mistakes = 10 points
  } else if (mistakes <= totalPossibleMistakes * 0.25) {
    return 7; // Up to 25% of possible mistakes = 7 points
  } else if (mistakes <= totalPossibleMistakes * 0.5) {
    return 4; // Up to 50% of possible mistakes = 4 points
  } else {
    return 1; // More than 50% of possible mistakes = 1 point
  }
};

export const getStarsFromAttempts = (
  attempts: Attempt[],
  gameData: GameData,
) => {
  const totalPoints = attempts.reduce((points, attempt) => {
    return (
      points +
      calculatePoints(
        attempt.mistakes,
        gameData[attempt.pageNumber]?.totalMistakesPossible || 0,
      )
    );
  }, 0);

  const numOfGames = attempts.length;
  const percentage = 100 * (totalPoints / (MAX_POINTS * numOfGames));

  if (percentage >= 90 && percentage <= 100) {
    return 5;
  } else if (percentage >= 75 && percentage <= 89) {
    return 4;
  } else if (percentage >= 50 && percentage <= 74) {
    return 3;
  } else if (percentage >= 25 && percentage <= 49) {
    return 2;
  } else {
    return 1;
  }
};
