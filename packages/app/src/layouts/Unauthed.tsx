import { I18nWrapper } from "@/components/I18nWrapper";
import { IonContent, IonPage } from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";
import { useClassroom } from "@/hooks/Classroom";
import { useProfile } from "@/hooks/Profile";
import { useStudent } from "@/hooks/Student";

interface UnauthedLayoutProps {
  background?: string; // Default to false
  children: React.ReactNode;
}

export const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
  background,
  children,
}) => {
  const { info } = useClassroom();
  const { isLoggedIn: isStudentLoggedIn } = useStudent();
  const { isLoggedIn: isUserLoggedIn } = useProfile();
  if (isUserLoggedIn) {
    return <Redirect to="/" />;
  }
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
