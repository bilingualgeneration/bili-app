import { I18nWrapper } from "@/components/I18nWrapper";
import { IonContent, IonPage } from "@ionic/react";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";

interface UnauthedLayoutProps {
  background?: string; // Default to false
  children: React.ReactNode;
}

export const PublicLayout: React.FC<UnauthedLayoutProps> = ({
  background,
  children,
}) => {
  const { language } = useInterfaceLanguage();
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding background-figures">
        <I18nWrapper locale={language}>
          <div className="page-wrapper" style={{ background }}>
            {children}
          </div>
        </I18nWrapper>
      </IonContent>
    </IonPage>
  );
};
