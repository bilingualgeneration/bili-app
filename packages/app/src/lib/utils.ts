// Number of Attempts to get word correct:
// 1st attempt: 10 points
// 2nd attempt: 7 points
// 3rd attempt: 4 points
// More than 3 attempts: 1 point

// Overall percentage calculation = (sum of points in all games / (10 * number of games) ) * 100

// Star Rating:
// 90-100%: 5 stars
// 75-89%: 4 stars
// 50-74%: 3 stars
// 25-49%: 2 stars
// 0-24%: 1 star

export const getStarsfromAccuracy = (accuracy: number) => {
  if (accuracy === 0) return 0;
  if (accuracy === 1) return 5;
  if (accuracy >= 0.9) return 4;
  if (accuracy >= 0.5) return 2;

  return 1;
};

const MAX_POINTS = 10;
const POINTS_DIFF = 3;

export const getStarsFromStoryAttempts = (
  attempts: any[],
  numOfGames: number,
) => {
  const points = getTotalPointsFromStoryAttempts(attempts);
  const stars = getStarsFromPoints(points, numOfGames);
  return stars;
};

export const getStarsFromPoints = (
  points: number,
  numOfGames: number,
): number => {
  const accuracy = (points / (numOfGames * POINTS_DIFF)) * 100;

  if (accuracy >= 90 && accuracy <= 100) return 5;
  else if (accuracy >= 75 && accuracy <= 89) return 4;
  else if (accuracy >= 50 && accuracy <= 74) return 3;
  else if (accuracy >= 25 && accuracy <= 49) return 2;
  else return 1;
};

export const getTotalPointsFromStoryAttempts = (attempts: any[]) => {
  let totalPoints = 0;

  attempts.forEach(({ count }) => {
    if (count === 1) totalPoints += MAX_POINTS;
    else if (count === 2) totalPoints += 7;
    else if (count === 3) totalPoints += 4;
    else totalPoints += 1;
  });

  return totalPoints;
};
