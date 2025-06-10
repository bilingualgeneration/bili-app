// TODO: don't modify firestore directly

import { createContext, useContext, useEffect, useState } from "react";
import { Device } from "@capacitor/device";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/components/Firebase";
import { Preferences } from "@capacitor/preferences";
import { useProfile } from "@/hooks/Profile";

type InterfaceLanguageState = any;

const InterfaceLanguageContext = createContext<InterfaceLanguageState>(
  {} as InterfaceLanguageState,
);

export const useInterfaceLanguage = () => useContext(InterfaceLanguageContext);

export const InterfaceLanguageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [language, internalSetLanguage] = useState<string | null>(null);
  const { profile, user } = useProfile();
  useEffect(() => {
    (async () => {
      const { value: storedLanguage } = await Preferences.get({
        key: "interfaceLanguage",
      });
      if (storedLanguage !== null) {
        internalSetLanguage(storedLanguage);
      } else {
        const deviceLanguage = (
          await Device.getLanguageCode()
        ).value.toLowerCase();
        const languageToSet =
          deviceLanguage === "en" || deviceLanguage === "es"
            ? deviceLanguage
            : "en";
        Preferences.set({ key: "interfaceLanguage", value: languageToSet });
        internalSetLanguage(languageToSet);
      }
    })();
  }, []);

  const setLanguage = (newLanguage: string) => {
    if (newLanguage !== language) {
      Preferences.set({ key: "interfaceLanguage", value: newLanguage });
      if (user) {
        const ref = doc(firestore, "user", user.uid);
        updateDoc(ref, { language: newLanguage });
        internalSetLanguage(newLanguage);
      } else {
        internalSetLanguage(newLanguage);
      }
    }
  };

  useEffect(() => {
    if (profile && profile.language !== language) {
      setLanguage(profile.language);
    }
  }, [profile, setLanguage]);

  return (
    <InterfaceLanguageContext.Provider
      children={language === null ? <></> : children}
      value={{
        language,
        setLanguage,
      }}
    />
  );
};
