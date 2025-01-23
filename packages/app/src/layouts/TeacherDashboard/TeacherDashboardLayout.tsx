import biliLogo from "@/assets/icons/bili.svg";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { StudentInfo } from "@/components/StudentInfo";
import { useEffect } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useProfile } from "@/hooks/Profile";
import { useLocation } from "react-router-dom";

import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import "./TeacherDashboardLayout.scss";

export const TeacherDashboardHeader: React.FC = () => {
  const {
    user: { uid },
  } = useProfile();
  return (
    <IonGrid id="teacher-dashboard-layout-header">
      <IonRow>
        <IonCol></IonCol>
        <IonCol className="buttons-center">
          <img src={biliLogo} className="header-bili-logo" />
        </IonCol>
        <IonCol className="buttons-end">
          <Link to="/classrooms">
            <IonButton className="font-weight-normal" size="small" fill="clear">
              <IonIcon slot="start" icon={SchoolIcon} />
              My Classrooms
            </IonButton>
          </Link>
          <IonButton
            className="font-weight-normal ion-hide"
            disabled={true}
            size="small"
            fill="clear"
          >
            <IonIcon slot="start" icon={HelpIcon} />
            Help
          </IonButton>
          <div>
            <StudentInfo id={uid} type="user" size="sm" />
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

interface TeacherDashboardLayout {
  showHeader?: boolean;
}

export const TeacherDashboardLayout: React.FC<
  React.PropsWithChildren<TeacherDashboardLayout>
> = ({ children, showHeader = true }) => {
  const { setIsVisible, setTempLanguage } = useLanguageToggle();
  useEffect(() => {
    setIsVisible(false);
    setTempLanguage("en");
    return () => {
      setIsVisible(true);
      setTempLanguage(null);
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
