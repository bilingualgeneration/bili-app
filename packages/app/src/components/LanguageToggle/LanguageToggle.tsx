import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useState,
} from 'react';

import classnames from "classnames";
import './LanguageToggle.css';

type LanguageToggleState = any;
type Language = 'en' | 'esen' | 'es';
interface LanguageToggleProviderProps {
  allowedLanguages: Language[]
}

const LanguageToggleContext = createContext<LanguageToggleState>({} as LanguageToggleState);

export const useLanguageToggle = () => useContext(LanguageToggleContext);

export const LanguageToggleProvider: React.FC<React.PropsWithChildren<LanguageToggleProviderProps>> = ({
  allowedLanguages = ['en', 'es', 'en'],
  children
}) => {
  const [language, setLanguage] = useState<Language>(allowedLanguages[0]);
  const cycleLanguage = useCallback(() => {
    setLanguage(allowedLanguages[(allowedLanguages.indexOf(language) + 1) % allowedLanguages.length]);
  }, [language, setLanguage]);
  return <LanguageToggleContext.Provider
	   children={children}
	   value={{
	     language,
	     cycleLanguage
	   }}
  />
};

export const LanguageToggle: React.FC = () => {
  const {
    cycleLanguage,
    language
  } = useLanguageToggle();
  const [pressed, setPressed] = useState<boolean>(false);
  return <div
	   className={classnames('drop-shadow', 'language-toggle', language, {pressed})}
	   onMouseDown={() => {
	     setPressed(true);
	   }}
	   onMouseUp={() => {
	     setPressed(false);
	     cycleLanguage();
	   }}>
    <div className={classnames('language-toggle-inner')}>
      {language === 'esen' ? <>es<br />en</>: language}
    </div>
  </div>;
}
