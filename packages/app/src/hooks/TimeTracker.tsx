import { App } from "@capacitor/app";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type TimeTrackerState = any;

const TimeTrackerContext = createContext<TimeTrackerState>(
  {} as TimeTrackerState,
);
export const useTimeTracker = () => useContext(TimeTrackerContext);

export const TimeTrackerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const times = useRef<Date[]>([]);
  const isTiming = useRef<boolean>(false);

  App.addListener("pause", () => {
    if (isTiming.current) {
      times.current.push(new Date());
    }
  });

  App.addListener("resume", () => {
    if (isTiming.current) {
      times.current.push(new Date());
    }
  });

  const startTimer = () => {
    times.current = [new Date()];
    isTiming.current = true;
  };
  const stopTimer = () => {
    times.current.push(new Date());
    let timeElapsed = 0;
    for (let i = 0; i < times.current.length && times.length > 1; i += 2) {
      timeElapsed +=
        Math.abs(times.current[i].getTime() - times.current[i + 1].getTime()) /
        1000;
    }
    times.current = [];
    isTiming.current = false;
    return timeElapsed;
  };
  return (
    <TimeTrackerContext.Provider
      children={children}
      value={{
        startTimer,
        stopTimer,
      }}
    />
  );
};
