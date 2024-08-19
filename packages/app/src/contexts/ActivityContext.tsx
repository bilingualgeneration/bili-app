import { createContext, useContext, useEffect, useState } from "react";

export type Attempt = {
  pageNumber: number;
  mistakes: number;
};

type PageNumber = number;

export type GameData = Record<
  PageNumber,
  {
    totalMistakesPossible: number;
  }
>;

type ActivityState = {
  type: string | null;
  id: string | null;
  classroomId: string | null;
  studentId: string | null;
};

type ActivityContextType = {
  activityState: ActivityState;
  setActivityState: React.Dispatch<React.SetStateAction<ActivityState>>;
  gamesData: GameData;
  setGamesData: React.Dispatch<React.SetStateAction<GameData>>;
  attempts: Attempt[];
  setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>;
  handleMistake: () => void;
  handleResetAttempts: () => void;
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setFirstGamePageNumber: React.Dispatch<React.SetStateAction<number | null>>;
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
    classroomId: null,
    studentId: null,
  });

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [firstGamePageNumber, setFirstGamePageNumber] = useState<number | null>(
    null,
  );

  const [gamesData, setGamesData] = useState<GameData>({});
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [hearts, setHearts] = useState<number>(0);

  console.log("attempts", attempts);
  console.log("gamesData", gamesData);

  const handleMistake = () => {
    setAttempts((prev) => {
      const newAttempts = [...prev];
      const attemptIndex = newAttempts.findIndex(
        (attempt) => attempt.pageNumber === pageNumber,
      );

      if (attemptIndex === -1) {
        newAttempts.push({
          pageNumber,
          mistakes: 1,
        });
      } else {
        const attempt = newAttempts[attemptIndex];
        newAttempts[attemptIndex] = {
          ...attempt,
          mistakes: attempt.mistakes + 1,
        };
      }

      return newAttempts;
    });
  };

  const handleResetAttempts = () => {
    setAttempts([]);
  };

  // Reset attempt
  useEffect(() => {
    if (pageNumber === firstGamePageNumber) {
      handleResetAttempts();
    }
  }, [pageNumber, firstGamePageNumber]);

  // If there is no record of an attempt on this page then add one
  useEffect(() => {
    if (firstGamePageNumber !== null && pageNumber === firstGamePageNumber) {
      setAttempts((prev) => {
        const attempt = prev.find((item) => item.pageNumber === pageNumber);
        if (attempt) return prev;

        return [
          ...prev,
          {
            pageNumber,
            mistakes: 0,
          },
        ];
      });
    }
  }, [firstGamePageNumber, pageNumber]);

  return (
    <ActivityContext.Provider
      value={{
        activityState,
        setActivityState,
        gamesData,
        setGamesData,
        attempts,
        setAttempts,
        handleMistake,
        handleResetAttempts,
        hearts,
        setHearts,
        setPageNumber,
        setFirstGamePageNumber,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
