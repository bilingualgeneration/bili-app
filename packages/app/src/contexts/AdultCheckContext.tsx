import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type adultCheck = {
  isAdultCheckOpen: boolean;
  setIsAdultCheckOpen: any; // todo: better typing
};

const defaultState: adultCheck = {
  isAdultCheckOpen: true,
  setIsAdultCheckOpen: () => {},
};

const AdultCheckContext = createContext<adultCheck>(defaultState);

export const useAdultCheck = () => useContext(AdultCheckContext);

export const AdultCheckProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isAdultCheckOpen, setIsAdultCheckOpen] = useState<boolean>(true);
  return (
    <AdultCheckContext.Provider
      value={{
        isAdultCheckOpen,
        setIsAdultCheckOpen,
      }}
    >
      {children}
    </AdultCheckContext.Provider>
  );
};
