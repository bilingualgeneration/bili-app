import { useClassroom } from "@/hooks/Classroom";
import { useStudent } from "@/hooks/Student";
import { getStarsFromAttempts } from "@/lib/utils";
import { updateActivityStars } from "@/realtimeDb";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";

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
  id: string | null;
  type: string | null;
};

type ActivityContextType = {
  //  activityState: ActivityState;
  //  setActivityState: React.Dispatch<React.SetStateAction<ActivityState>>;
  setActivityState: any;
  setGamesData: React.Dispatch<React.SetStateAction<GameData>>;
  handleAttempt: (gameId: GameId, isCorrect: boolean) => void;
  handleResetAttempts: () => void;
  handleRecordAttempt: (time?: number) => Promise<number>;
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
  const { language } = useLanguageToggle();
  const activityId = useRef<string | null>(null);
  const activityType = useRef<string | null>(null);

  /*
  const [activityState, setActivityState] = useState<ActivityState>({
    id: null,
    type: null,
  });
  */

  const setActivityState = useCallback(
    (state: ActivityState) => {
      activityId.current = state.id;
      activityType.current = state.type;
    },
    [activityId, activityType],
  );

  const [gamesData, setGamesData] = useState<GameData>(new Map());
  const [attempts, setAttempts] = useState<Attempts>(new Map());
  // TODO: need to implement for activities that give hearts
  const [hearts, setHearts] = useState<number>(0);
  const [stars, setStars] = useState(0);

  const student = useStudent();
  const classroom = useClassroom();

  const functions = getFunctions();
  const recordUserActivity = httpsCallable(functions, "user-activity-record");

  const handleAttempt = useCallback(
    (gameId: GameId, isCorrect: boolean) => {
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
    },
    [setAttempts],
  );

  const handleResetAttempts = () => {
    setAttempts(new Map());
  };

  const handleRecordAttempt = useCallback(
    async (time?: number) => {
      console.log(classroom);
      console.log("recording data");
      if (!activityId.current || !activityType.current)
        throw new Error("Activity ID or type missing");

      const stars = getStarsFromAttempts(attempts, gamesData);
      setStars(stars);

      // send to server to record in bigquery
      await recordUserActivity({
        activity: activityType.current,
        activityId: activityId.current,
        userId: student.id,
        classroomId: classroom && classroom.info ? classroom.info.id : null,
        type: "attempt",
        timeSpent: Math.floor(time ?? -1),
        timestamp: new Date().toISOString(),
        version: "0.0.1",
        data: JSON.stringify({
          attempts: Object.fromEntries(attempts),
        }),
        language,
      });

      await updateActivityStars({
        classroomId: classroom.id,
        userId: student.id,
        activity: activityType.current,
        activityId: activityId.current,
        stars,
      });

      return stars;
    },
    [
      activityId,
      activityType,
      attempts,
      gamesData,
      student,
      classroom,
      language,
    ],
  );
  return (
    <ActivityContext.Provider
      value={{
        //activityState,
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
