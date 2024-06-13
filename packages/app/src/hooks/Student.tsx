import {
  createContext,
  useContext,
}
import {
  useState
} from 'react';


type StudentState = any;

const StudentContext = createContext<StudentState>({} as StudentState);

export const useStudent = () => useContext(StudentContext);

export const StudentProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [stars, setStars] = useState<number | undefined>(undefined);
  const [hearts, setHearts] = useState<number | undefined>(undefined);
  const [language, setLanguage] = useState<string>('es');
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [age, setAge] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  //const [, set] = useState<>();
  
  return <StudentContext.Provider
  children={children}
  value={{
    name,
    setName,
    id,
    setId,
    stars,
    setStars,
    hearts,
    setHearts,
    language,
    setLanguage,
    isInclusive,
    setIsInclusive,
  }} />;
};
