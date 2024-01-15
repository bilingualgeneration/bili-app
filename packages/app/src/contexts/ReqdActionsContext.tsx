import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type reqdActionObject = { [key: string]: boolean };

export type reqdActions = {
  reqdActions: reqdActionObject;
  setReqdActions: any; // todo: better typing
};

const defaultState: reqdActions = {
  reqdActions: {},
  setReqdActions: () => {},
};

const ReqdActionsContext = createContext<reqdActions>(defaultState);

export const useReqdActions = () => useContext(ReqdActionsContext);

export const ReqdActionsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [reqdActions, setReqdActions] = useState<reqdActionObject>({});
  return (
    <ReqdActionsContext.Provider
      value={{
        reqdActions,
        setReqdActions,
      }}
    >
      {children}
    </ReqdActionsContext.Provider>
  );
};
