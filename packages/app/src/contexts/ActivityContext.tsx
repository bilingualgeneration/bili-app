import { useClassroom } from "@/hooks/Classroom";
import { useStudent } from "@/hooks/Student";
import { getStarsFromAttempts } from "@/lib/utils";
import { updateActivityStars } from "@/realtimeDb";
import { getFunctions, httpsCallable } from "firebase/functions";
import { createContext, useContext, useState } from "react";

export type Attempt = {
  mistakes: number;
};

type GameId = string;

export type Attempts = Map<GameId, Attempt>;

export type GameData = Map<
  GameId,
  {
    totalMistakesPossible: number;
  }
>;

type ActivityState = {
  type: string | null;
  id: string | null;
};

type ActivityContextType = {
  activityState: ActivityState;
  setActivityState: React.Dispatch<React.SetStateAction<ActivityState>>;
  setGamesData: React.Dispatch<React.SetStateAction<GameData>>;
  handleAttempt: (gameId: GameId, isCorrect: boolean) => void;
  handleResetAttempts: () => void;
  handleRecordAttempt: () => Promise<number>;
  stars: number;
  hearts: number;
};

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined,
);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
};

export const ActivityProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [activityState, setActivityState] = useState<ActivityState>({
    type: null,
    id: null,
  });

  const [gamesData, setGamesData] = useState<GameData>(new Map());
  const [attempts, setAttempts] = useState<Attempts>(new Map());
  // TODO: need to implement for activities that give hearts
  const [hearts, setHearts] = useState<number>(0);
  const [stars, setStars] = useState(0);

  const student = useStudent();
  const classroom = useClassroom();
  console.log("student", student);
  console.log("classroom", classroom);

  const functions = getFunctions();
  const recordUserActivity = httpsCallable(functions, "user-activity-record");

  const handleAttempt = (gameId: GameId, isCorrect: boolean) => {
    setAttempts((prev) => {
      const newAttempts = new Map(prev);
      const attempt = newAttempts.get(gameId);

      if (attempt) {
        if (!isCorrect) {
          attempt.mistakes += 1;
        }
      } else {
        newAttempts.set(gameId, { mistakes: isCorrect ? 0 : 1 });
      }

      return newAttempts;
    });
  };

  const handleResetAttempts = () => {
    setAttempts(new Map());
  };

  const handleRecordAttempt = async () => {
    if (!activityState.id || !activityState.type)
      throw new Error("Activity ID or type missing");

    const stars = getStarsFromAttempts(attempts, gamesData);
    setStars(stars);

    await recordUserActivity({
      activity: activityState.type,
      activityId: activityState.id,
      type: "attempt",
      time: new Date().toISOString(),
      version: "0.0.1",
      data: JSON.stringify({
        attempts: Object.fromEntries(attempts),
      }),
    });

    await updateActivityStars({
      classroomId: classroom.id,
      userId: student.id,
      activity: activityState.type,
      activityId: activityState.id,
      stars,
    });

    return stars;
  };

  return (
    <ActivityContext.Provider
      value={{
        activityState,
        setActivityState,
        setGamesData,
        handleAttempt,
        handleResetAttempts,
        handleRecordAttempt,
        stars,
        hearts,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
