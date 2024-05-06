import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type DnDState = any;

const DnDContext = createContext<DnDState>({} as DnDState);

export const useDnD = () => useContext(DnDContext);

export const DnDProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [pieces, setPieces] = useState<any[]>([]);
  const percentDropped = Object.values(pieces).filter((p) => p.dropped).length / Object.keys(pieces).length;
  
  return <DnDContext.Provider
	   children={children}
	   value={{
	     percentDropped,
	     pieces,
	     setPieces
	   }} />;
};
