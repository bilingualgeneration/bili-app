import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Language, useLanguage } from "@/hooks/Language";

import classnames from "classnames";
import "./LanguageToggle.scss";

type LanguageToggleState = any;
interface LanguageToggleProviderProps {
  allowedLanguages?: Language[];
}

const LanguageToggleContext = createContext<LanguageToggleState>(
  {} as LanguageToggleState,
);

export const useLanguageToggle = () => useContext(LanguageToggleContext);

export const LanguageToggleProvider: React.FC<
  React.PropsWithChildren<LanguageToggleProviderProps>
> = ({ allowedLanguages = ["en", "es", "es.en"], children }) => {
  const { language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const stashedLanguage = useRef<Language | null>(language);
  const [tempAllowedLanguages, setTempAllowedLanguages] = useState<
    Language[] | null
  >(null);

  useEffect(() => {
    if (!allowedLanguages.includes(language)) {
      setLanguage(allowedLanguages[0]);
    }
  }, [allowedLanguages, language, setLanguage]);

  const setTempLanguage = useCallback(
    (newLanguage: Language | null) => {
      if (newLanguage === null) {
        setLanguage(stashedLanguage.current || allowedLanguages[0]);
        stashedLanguage.current = null;
      } else {
        stashedLanguage.current = language;
        setLanguage(newLanguage);
      }
    },
    [allowedLanguages, language, setLanguage, stashedLanguage],
  );

  const cycleLanguage = useCallback(() => {
    // use temp list of allowed languages if there are any
    const cycleableLanguages =
      tempAllowedLanguages !== null ? tempAllowedLanguages : allowedLanguages;
    setLanguage(
      cycleableLanguages[
        (cycleableLanguages.indexOf(language) + 1) % cycleableLanguages.length
      ],
    );
  }, [language, setLanguage]);

  return (
    <LanguageToggleContext.Provider
      children={children}
      value={{
        cycleLanguage,
        isVisible,
        language,
        setIsVisible,
        setTempAllowedLanguages,
        setTempLanguage,
      }}
    />
  );
};

export const LanguageToggle: React.FC = () => {
  const { cycleLanguage, language, isVisible } = useLanguageToggle();
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <div
      className={classnames(
        "drop-shadow",
        "language-toggle",
        language.replace(".", "-"),
        {
          pressed,
          ["ion-hide"]: isVisible === false,
        },
      )}
      onMouseDown={() => {
        setPressed(true);
      }}
      onMouseUp={() => {
        setPressed(false);
        cycleLanguage();
      }}
    >
      <div className={classnames("language-toggle-inner", "semibold")}>
        {language.includes(".") ? (
          <>
            {language.split(".")[0]}
            <br />
            {language.split(".")[1]}
          </>
        ) : (
          language
        )}
      </div>
    </div>
  );
};
