import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useState,
} from "react";

import classnames from "classnames";
import "./LanguageToggle.css";

type LanguageToggleState = any;
type Language = "en" | "esen" | "es";
interface LanguageToggleProviderProps {
  allowedLanguages?: Language[];
}

const LanguageToggleContext = createContext<LanguageToggleState>(
  {} as LanguageToggleState,
);

export const useLanguageToggle = () => useContext(LanguageToggleContext);

export const LanguageToggleProvider: React.FC<
  React.PropsWithChildren<LanguageToggleProviderProps>
> = ({ allowedLanguages = ["en", "es", "esen"], children }) => {
  const [language, setLanguage] = useState<Language>(allowedLanguages[0]);
  const [isVisible, setIsVisible] = useState(true);

  const [stashedLanguage, setStashedLanguage] = useState<Language | null>(null);
  const [tempAllowedLanguages, setTempAllowedLanguages] = useState<
    Language[] | null
  >(null);

  const setTempLanguage = useCallback(
    (newLanguage: Language | null) => {
      if (newLanguage === null) {
        setLanguage(stashedLanguage || allowedLanguages[0]);
        setStashedLanguage(null);
      } else {
        setStashedLanguage(language);
        setLanguage(newLanguage);
      }
    },
    [language, setLanguage, setStashedLanguage],
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
      className={classnames("drop-shadow", "language-toggle", language, {
        pressed,
        ["ion-hide"]: isVisible === false,
      })}
      onMouseDown={() => {
        setPressed(true);
      }}
      onMouseUp={() => {
        setPressed(false);
        cycleLanguage();
      }}
    >
      <div
        className={classnames("language-toggle-inner", "text-2xl", "semibold")}
      >
        {language === "esen" ? (
          <>
            es
            <br />
            en
          </>
        ) : (
          language
        )}
      </div>
    </div>
  );
};
