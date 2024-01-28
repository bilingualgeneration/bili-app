import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type language = {
  locale: any;
  //setLocale: Dispatch<SetStateAction<locale>>
  setLocale: any;
};

const defaultState: language = {
  locale: (localStorage.getItem("userLocale") as any) || "en", // Read from local storage or use a default value
  setLocale: () => {},
};

const LanguageContext = createContext<language>(defaultState);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const storedLocale = localStorage.getItem("userLocale");
  // @ts-ignore: todo fix
  const [locale, setLocaleState] = useState<locale>(
    // @ts-ignore: todo fix
    storedLocale || defaultState.locale,
  );

  const setLocale = (newLocale: any) => {
    localStorage.setItem("userLocale", newLocale);
    // @ts-ignore: todo fix
    setLocaleState(newLocale);
  };

  return (
    <>
      <LanguageContext.Provider
        value={
          // @ts-ignore: todo fix
          {
            locale,
            setLocale,
          }
        }
      >
        {children}
      </LanguageContext.Provider>
    </>
  );
};
