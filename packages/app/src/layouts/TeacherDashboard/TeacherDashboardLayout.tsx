import biliLogo from "@/assets/icons/bili.svg";
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import { SideMenu } from "@/components/Settings/SideMenu";
import { StudentInfo } from "@/components/StudentInfo";
import { useEffect } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useLocation } from "react-router-dom";

import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import "./TeacherDashboardLayout.css";

export const TeacherDashboardHeader: React.FC = () => {
  return (
    <div id="teacher-dashboard-layout-header">
      <div>search</div>
      <img src={biliLogo} />
      <div className="buttons-end">
        <Link to="/classrooms">
          <IonButton size="small" fill="clear">
            <IonIcon slot="start" icon={SchoolIcon} />
            My Classrooms
          </IonButton>
        </Link>
        <IonButton size="small" fill="clear">
          <IonIcon slot="start" icon={HelpIcon} />
          Help
        </IonButton>
        <StudentInfo userId="" userType="" size="sm" />
      </div>
    </div>
  );
};

interface TeacherDashboardLayout {
  showHeader?: boolean;
}

export const TeacherDashboardLayout: React.FC<
  React.PropsWithChildren<TeacherDashboardLayout>
> = ({ children, showHeader = true }) => {
  const { setIsVisible } = useLanguageToggle();
  useEffect(() => {
    setIsVisible(false);
    return () => {
      setIsVisible(true);
    };
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen={true} className="ion-padding background-figures">
        <div
          className="page-wrapper"
          style={{ backgroundColor: "#f7faf9", paddingBottom: 0 }}
        >
          {showHeader && <TeacherDashboardHeader />}
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};
