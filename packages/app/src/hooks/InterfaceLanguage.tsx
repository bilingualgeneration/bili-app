import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Device} from '@capacitor/device';
import {Preferences} from '@capacitor/preferences';

type InterfaceLanguageState = any;

const InterfaceLanguageContext = createContext<InterfaceLanguageState>({} as InterfaceLanguageState);

export const useInterfaceLanguage = () => useContext(InterfaceLanguageContext);

export const InterfaceLanguageProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [language, internalSetLanguage] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const {value: storedLanguage} = await Preferences.get({key: 'interfaceLanguage'});
      if(storedLanguage !== null){
	internalSetLanguage(storedLanguage);
      }else{
	const deviceLanguage = (await Device.getLanguageCode()).value.toLowerCase();
	const languageToSet = (deviceLanguage === 'en'
			    || deviceLanguage === 'es') ? deviceLanguage : 'en';
	Preferences.set({key: 'interfaceLanguage', value: languageToSet});
	internalSetLanguage(languageToSet);
      }
    })();
    
  }, []);

  const setLanguage = (newLanguage: string) => {
    Preferences.set({key: 'interfaceLanguage', value: newLanguage});
    internalSetLanguage(newLanguage);
  }
  
  return <InterfaceLanguageContext.Provider
	   children={language === null ? <></> : children}
	   value={{
	     language,
	     setLanguage
	   }} />;
};
