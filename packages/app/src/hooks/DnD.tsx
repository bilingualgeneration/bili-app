import {
  createContext,
  useContext,
  useState,
} from 'react';

type DnDState = any;

const DnDContext = createContext<DnDState>({} as DnDState);

export const useDnD = () => useContext(DnDContext);

export const DnDProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [pieces, setPieces] = useState<any[]>([]);
  const [targetPieces, setTargetPieces] = useState<any[]>([]);
  const [totalTargets, setTotalTargets] = useState<number>(0);
  const [piecesDropped, setPiecesDropped] = useState<number>(0);
  return <DnDContext.Provider
	   children={children}
	   value={{
	     piecesDropped,
	     setPiecesDropped,
	     pieces,
	     setPieces,
	     targetPieces,
	     setTargetPieces,
	     totalTargets,
	     setTotalTargets,
	   }} />;
};
