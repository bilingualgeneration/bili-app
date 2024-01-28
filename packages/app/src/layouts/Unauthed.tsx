import { I18nWrapper } from "@/components/I18nWrapper";
import { IonContent, IonPage } from "@ionic/react";
import {
  LanguageContextProvider,
  useLanguage,
} from "@/contexts/LanguageContext";
import React from "react";

interface UnauthedLayoutProps {
  background?: string; // Default to false
  children: React.ReactNode;
}

const UnauthedLayoutContents: React.FC<UnauthedLayoutProps> = ({
  background,
  children,
}) => {
  const contentStyle: Record<string, string> = {};
  const { locale } = useLanguage();
  return (
    <I18nWrapper locale={locale}>
      <IonPage>
        <IonContent fullscreen className="ion-padding">
          <div className="page-wrapper" style={{ background }}>
            {children}
          </div>
        </IonContent>
      </IonPage>
    </I18nWrapper>
  );
};

const UnauthedLayout: React.FC<UnauthedLayoutProps> = (props) => {
  return (
    <LanguageContextProvider>
      <UnauthedLayoutContents {...props} />
    </LanguageContextProvider>
  );
};

export default UnauthedLayout;
