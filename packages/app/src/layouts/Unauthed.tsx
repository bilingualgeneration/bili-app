import { I18nWrapper } from "@/components/I18nWrapper";
import { IonContent, IonPage } from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";
import { useProfile } from "@/hooks/Profile";
import { useStudent } from "@/hooks/Student";

interface UnauthedLayoutProps {
  background?: string; // Default to false
  children: React.ReactNode;
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
  background,
  children,
}) => {
  const { isLoggedIn, profile } = useProfile();
  const { language } = useInterfaceLanguage();
  const { id: studentId } = useStudent();

  // assume there are no public pages
  if (isLoggedIn) {
    switch (profile.role) {
      case "teacher":
        if (studentId === null) {
          return <Redirect to="/classrooms" />;
        } else {
          return <Redirect to="/student-dashboard" />;
        }
        break;
      case "caregiver":
        return <Redirect to="/caregiver/student-loader" />;
        break;
    }
  }
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

export default UnauthedLayout;
