import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const shortcodeRegex = /^\[([^\]]+)\]$/;

export type SingleLanguage = "en" | "es"; // TODO: handle better
export type Language = "en" | "es.en" | "en.es" | "es" | "esen"; // TODO: remove esen when fully migrated

export type LanguageState = {
  filterText: any;
  language: Language;
  languageCount: number;
  languagePrimary: SingleLanguage;
  languageSecondary: SingleLanguage;
  languageNormalized: Language;
  populateText: any;
  setLanguage: Dispatch<SetStateAction<Language>>;
};

const LanguageContext = createContext<LanguageState>({} as LanguageState);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: PropsWithChildren<{}>) => {
  const storedLanguage = localStorage.getItem("userLanguage");
  const [language, setInternalLanguage] = useState<Language>(
    (storedLanguage || "en") as Language,
  );
  const [languagePrimary, setLanguagePrimary] = useState<SingleLanguage>(
    (storedLanguage?.split(".")[0] || "en") as SingleLanguage,
  );
  const [languageSecondary, setLanguageSecondary] = useState<SingleLanguage>(
    (storedLanguage?.split(".")[1] || undefined) as SingleLanguage,
  );
  const [languageNormalized, setLanguageNormalized] = useState<Language>(
    (storedLanguage?.split(".").sort().join(".") || "en") as Language,
  );
  const [languageCount, setLanguageCount] = useState<number>(
    storedLanguage?.split(".").length || 1,
  );

  const filterText = useCallback(
    (
      haystack: any,
      languageField: string = "language",
      textField: string = "text",
    ) => {
      return language
        .split(".")
        .map((l) => {
          return haystack.filter((h: any) => h[languageField] === l)[0];
        })
        .map((p: any) => {
          const m: any = p[textField]?.match(shortcodeRegex);
          if (m) {
            return haystack.filter((h: any) => h[languageField] === m[1])[0];
          } else {
            return p;
          }
        });
    },
    [languageNormalized],
  );

  const populateText = useCallback(
    (
      haystack: any,
      languageField: string = "language",
      textField: string = "text",
    ) => {
      return language
        .split(".")
        .map((l: string) => haystack.filter((h: any) => h[languageField] === l))
        .flat();
    },
    [language],
  );

  const setLanguage = (newLanguage: any) => {
    localStorage.setItem("userLanguage", newLanguage);
    setLanguagePrimary(newLanguage.split(".")[0]);
    setLanguageSecondary(newLanguage.split(".")[1]);
    setLanguageNormalized(newLanguage.split(".").sort().join("."));
    setLanguageCount(newLanguage.split(".").length);
    setInternalLanguage(newLanguage);
  };

  return (
    <>
      <LanguageContext.Provider
        value={{
          filterText,
          language,
          languageCount,
          languagePrimary,
          languageSecondary,
          languageNormalized,
          populateText,
          setLanguage,
        }}
      >
        {children}
      </LanguageContext.Provider>
    </>
  );
};
