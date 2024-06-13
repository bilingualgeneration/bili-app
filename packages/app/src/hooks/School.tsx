import {
  createContext,
  useContext,
}

type SchoolState = any;

const SchoolContext = createContext<SchoolState>({} as SchoolState);

export const useSchool = () => useContext(SchoolContext);

export const SchoolProvider: React.FC<React.PropsWithChildren> = ({children}) => {

  return <SchoolContext.Provider
  children={children}
  value={{

  }} />;
};
