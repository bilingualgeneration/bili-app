import biliLogo from "@/assets/icons/bili.svg";
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import { SideMenu } from "@/components/Settings/SideMenu";
import { StudentInfo } from "@/components/StudentInfo";
import { useEffect } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useProfile } from "@/hooks/Profile";
import { useLocation } from "react-router-dom";

import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import "./TeacherDashboardLayout.css";

export const TeacherDashboardHeader: React.FC = () => {
  const {
    user: { uid },
  } = useProfile();
  return (
    <div id="teacher-dashboard-layout-header">
      <div>search</div>
      <div className="ion-text-center">
        <img src={biliLogo} />
      </div>
      <div className="buttons-end">
        <Link to="/classrooms">
          <IonButton className="font-weight-normal" size="small" fill="clear">
            <IonIcon slot="start" icon={SchoolIcon} />
            My Classrooms
          </IonButton>
        </Link>
        <IonButton className="font-weight-normal" size="small" fill="clear">
          <IonIcon slot="start" icon={HelpIcon} />
          Help
        </IonButton>
        <StudentInfo id={uid} type="user" size="sm" />
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
