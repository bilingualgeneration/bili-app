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
export type Language = "en" | "es.en" | "es" | "esen"; // TODO: remove esen when fully migrated

export type LanguageState = {
  getText: any;
  language: Language;
  languagePrimary: SingleLanguage;
  languageSecondary: SingleLanguage;
  languageNormalized: Language;
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

  const getText = useCallback(
    (
      haystack: any,
      languageField: string = "language",
      textField: string = "text",
    ) => {
      let payload = haystack.filter(
        (h: any) => h[languageField] === languageNormalized,
      );
      payload = payload.map((p: any) => {
        const m: any = p[textField].match(shortcodeRegex);
        if (m) {
          return haystack.filter((h: any) => h[languageField] === m[1])[0];
        } else {
          return p;
        }
      });
      // hackzorz: need to reverse order of payload only if language !== normalized language
      return language === languageNormalized ? payload : payload.reverse();
    },
    [languageNormalized],
  );

  const setLanguage = (newLanguage: any) => {
    localStorage.setItem("userLanguage", newLanguage);
    setLanguagePrimary(newLanguage.split(".")[0]);
    setLanguageSecondary(newLanguage.split(".")[1]);
    setLanguageNormalized(newLanguage.split(".").sort().join("."));
    setInternalLanguage(newLanguage);
  };

  return (
    <>
      <LanguageContext.Provider
        value={{
          getText,
          language,
          languagePrimary,
          languageSecondary,
          languageNormalized,
          setLanguage,
        }}
      >
        {children}
      </LanguageContext.Provider>
    </>
  );
};
