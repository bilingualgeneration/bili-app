import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type TimeTrackerState = any;

const TimeTrackerContext = createContext<TimeTrackerState>({} as TimeTrackerState);
export const useTimeTracker = () => useContext(TimeTrackerContext);

export const TimeTrackerProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [mark, setMark] = useState<Date>(new Date());
  const getTime = useCallback(() => {
    const now = new Date();
    const difference = Math.abs(now.getTime() - mark.getTime()) / 1000;
    return difference;
  }, [mark]);
  const startMark = useCallback(() => {
    setMark(new Date());
  }, [setMark]);
  return <TimeTrackerContext.Provider
  children={children}
  value={{
    mark,
    setMark,
    startMark,
    getTime
  }} />;
}
