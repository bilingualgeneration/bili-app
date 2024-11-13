import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "en" | "es.en" | "es" | "esen" /*esen is temporary */;

export type LanguageState = {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
};

const defaultState: LanguageState = {
  language: (localStorage.getItem("userLanguage") as Language) || "en", // Read from local storage or use a default value
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageState>(defaultState);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: PropsWithChildren<{}>) => {
  const storedLanguage = localStorage.getItem("userLanguage");
  const [language, setInternalLanguage] = useState<Language>(
    (storedLanguage || defaultState.language) as Language,
  );

  const setLanguage = (newLanguage: any) => {
    localStorage.setItem("userLanguage", newLanguage);
    setInternalLanguage(newLanguage);
  };

  return (
    <>
      <LanguageContext.Provider
        value={{
          language,
          setLanguage,
        }}
      >
        {children}
      </LanguageContext.Provider>
    </>
  );
};
