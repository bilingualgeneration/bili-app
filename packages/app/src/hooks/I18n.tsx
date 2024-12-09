import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";
import { useLanguage } from "@/hooks/Language";

import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

const dictionary: { [key: string]: any } = {
  en,
  es,
  "es-inc": es, // assume that the interface has no differences between inclusive and non inclusive Spanish
};

interface I18nState {
  getText: (
    id: string,
    level?: number,
    languageSource?: "authed" | "unauthed",
  ) => string | null | undefined;
  getLanguage: (
    level?: number,
    languageSource?: "authed" | "unauthed",
  ) => string | null;
}

const I18nContext = createContext<I18nState>({} as I18nState);

export const useI18n = () => useContext(I18nContext);

export const I18nProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { language } = useLanguage();
  const { language: interfaceLanguage } = useInterfaceLanguage();

  const getLanguage = useCallback(
    (level: number = 1, languageSource = "authed") => {
      const languages = (
        languageSource === "authed" ? language : interfaceLanguage
      ).split(".");
      console.log(languageSource, languageSource === "authed");
      if (languages.length < level || languages[level - 1] === undefined) {
        return null;
      } else {
        return languages[level - 1];
      }
    },
    [interfaceLanguage, language],
  );

  const getText = useCallback(
    (
      id: string,
      level: number = 1,
      languageSource: "authed" | "unauthed" = "authed",
    ) => {
      const l = getLanguage(level, languageSource);
      if (l === null || dictionary[l] === undefined) {
        return null;
      } else {
        return dictionary[l][id];
      }
    },
    [dictionary, getLanguage],
  );
  return (
    <I18nContext.Provider
      children={children}
      value={{
        getLanguage,
        getText,
      }}
    />
  );
};
