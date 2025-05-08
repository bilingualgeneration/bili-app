import biliLogo from "@/assets/icons/bili.svg";
import { I18nWrapper } from "@/components/I18nWrapper";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { Link, Redirect } from "react-router-dom";
import { StudentInfo } from "@/components/StudentInfo";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/Language";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useOldProfile } from "@/hooks/OldProfile";
import { useLocation } from "react-router-dom";

import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import "./Teacher.scss";

export const TeacherHeader: React.FC = () => {
  const {
    user: { uid },
  } = useOldProfile();

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

interface TeacherLayout {
  showHeader?: boolean;
}

export const TeacherLayout: React.FC<
  React.PropsWithChildren<TeacherLayout>
> = ({ children, showHeader = true }) => {
  const { profile, isLoggedIn } = useOldProfile();

  const { setIsVisible, setTempLanguage } = useLanguageToggle();
  const { language } = useLanguage();
  useEffect(() => {
    setIsVisible(false);
    setTempLanguage("en");
    return () => {
      setIsVisible(true);
      setTempLanguage(null);
    };
  }, []);

  if (!isLoggedIn || profile?.role !== "teacher") {
    return <Redirect to="/" />;
  }

  return (
    <I18nWrapper locale={language.slice(0, 2)}>
      <IonPage>
        <IonContent
          fullscreen={true}
          className="ion-padding background-figures"
        >
          <div
            className="page-wrapper"
            style={{ backgroundColor: "#f7faf9", paddingBottom: 0 }}
          >
            {showHeader && <TeacherHeader />}
            {children}
          </div>
        </IonContent>
      </IonPage>
    </I18nWrapper>
  );
};
