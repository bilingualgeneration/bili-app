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
import { useProfile } from "@/hooks/Profile";
import { useLocation } from "react-router-dom";

import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import "./Caregiver.scss";

export const CaregiverHeader: React.FC = () => {
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
          {/*
          <Link to="/classrooms">
            <IonButton className="font-weight-normal" size="small" fill="clear">
              <IonIcon slot="start" icon={SchoolIcon} />
              My Classrooms
            </IonButton>
          </Link>
	  */}
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

interface CaregiverLayout {
  showHeader?: boolean;
}

export const CaregiverLayout: React.FC<
  React.PropsWithChildren<CaregiverLayout>
> = ({ children, showHeader = true }) => {
  const { profile, isLoggedIn } = useProfile();

  if (!isLoggedIn || profile?.role !== "caregiver") {
    return <Redirect to="/" />;
  }
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
            {showHeader && <CaregiverHeader />}
            {children}
          </div>
        </IonContent>
      </IonPage>
    </I18nWrapper>
  );
};
