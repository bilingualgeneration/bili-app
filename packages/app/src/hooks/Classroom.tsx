import {
  createContext,
  useContext,
}
import {
  useState
} from 'react';

type ClassroomState = any;

const ClassroomContext = createContext<ClassroomState>({} as ClassroomState);

export const useClassroom = () => useContext(ClassroomContext);

export const ClassroomProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [allowedLanguages, setAllowedLanguages] = useState<string[]>(['es']);
  const [allowInclusive, setAllowInclusive] = useState<boolean>(false);
  const [isInclusive, setIsInclusive] = useState<boolean | undefined>(undefined); // undefined means student can select
  
  return <ClassroomContext.Provider
  children={children}
  value={{

  }} />;
};
