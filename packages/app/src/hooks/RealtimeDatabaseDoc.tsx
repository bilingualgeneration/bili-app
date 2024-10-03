import { createContext, useContext, useEffect, useState } from "react";
import { database } from "@/components/Firebase";
import { onValue, ref } from "firebase/database";

type Status = "error" | "loading" | "ready";

type RealtimeDatabaseDocState = any;
const RealtimeDatabaseDocContext = createContext<RealtimeDatabaseDocState>(
  {} as RealtimeDatabaseDocState,
);
export const useRealtimeDatabaseDoc = () =>
  useContext(RealtimeDatabaseDocContext);

interface RealtimeDatabaseDocProviderProps {
  path: string;
}

export const RealtimeDatabaseDocProvider: React.FC<
  React.PropsWithChildren<RealtimeDatabaseDocProviderProps>
> = ({ children, path }) => {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onValue(
      ref(database, path),
      (response) => {
        setData(response.val());
        setStatus("ready");
      },
      (error) => {
        // TODO: error handling
        console.log(error);
      },
    );
    return unsubscribe;
  }, [setData, setStatus, path]);

  return (
    <RealtimeDatabaseDocContext.Provider
      children={children}
      value={{
        data,
        status,
      }}
    />
  );
};
