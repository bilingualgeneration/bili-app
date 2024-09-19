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
import { useLanguageToggle } from "@/components/LanguageToggle";
import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import { useEffect } from "react";

import "./TeacherDashboardWrapper.css";
import { SideMenu } from "./Settings/SideMenu";
import { StudentInfo } from "@/components/StudentInfo";

const TeacherDashboardHeader: React.FC = () => {
  return (
    <div id="teacher-dashboard-wrapper-header">
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

export const TeacherDashboardWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
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
        <div className="page-wrapper" style={{ backgroundColor: "#f7faf9" }}>
          <IonGrid className="ion-no-padding inner-scroll">
            <IonRow>
              <IonCol size="1.85" style={{ minHeight: "100vh" }}>
                <SideMenu />
              </IonCol>
              <IonCol size="10">
                <TeacherDashboardHeader />
                {children}
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};
