import { useIntl, FormattedMessage } from "react-intl";
import { IonLabel, IonToggle } from "@ionic/react";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";

export const LanguageSwitcher: React.FC = () => {
  const intl = useIntl();
  const { language, setLanguage } = useInterfaceLanguage();
  return (
    <>
      <div className="text-md semibold color-suelo">
        <IonToggle
          checked={language === "es"}
          mode="ios"
          onIonChange={() => {
            setLanguage(language === "es" ? "en" : "es");
          }}
        >
          <IonLabel>
            {language === "es" ? "Modo Español" : "English Mode"}
          </IonLabel>
        </IonToggle>
      </div>
    </>
  );
};
