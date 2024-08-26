import { Attempts, GameData } from "@/contexts/ActivityContext";

const MAX_POINTS = 10;

export const calculatePoints = (
  mistakes: number,
  totalPossibleMistakes: number,
): number => {
  const pointsDiff = Math.ceil(MAX_POINTS / 4);

  if (mistakes === 0) {
    return MAX_POINTS; // 0 mistakes = 10 points
  } else if (mistakes <= totalPossibleMistakes * 0.25) {
    return MAX_POINTS - pointsDiff; // Up to 25% of possible mistakes = 7 points
  } else if (mistakes <= totalPossibleMistakes * 0.5) {
    return MAX_POINTS - 2 * pointsDiff; // Up to 50% of possible mistakes = 4 points
  } else {
    return 1; // More than 50% of possible mistakes = 1 point
  }
};

export const getStarsFromAttempts = (
  attempts: Attempts,
  gameData: GameData,
) => {
  let totalPoints = 0;
  let numOfGames = 0;

  attempts.forEach((attempt, gameId) => {
    if (!gameId) return;

    const gameInfo = gameData.get(gameId);
    if (!gameInfo) return;

    const totalMistakesPossible = gameInfo.totalMistakesPossible || 0;

    totalPoints += calculatePoints(attempt.mistakes, totalMistakesPossible);
    numOfGames += 1;
  });

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
