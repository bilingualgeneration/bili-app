import biliLogo from "@/assets/icons/bili.svg";
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import { useEffect } from "react";

import "./TeacherDashboardWrapper.css";

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
          <div id="teacher-dashboard-wrapper-header">
            <div>search</div>
            <img src={biliLogo} />
            <div>
              <IonButton size="small" fill="clear">
                <IonIcon slot="start" icon={SchoolIcon} />
                My Classrooms
              </IonButton>
              <IonButton size="small" fill="clear">
                <IonIcon slot="start" icon={HelpIcon} />
                Help
              </IonButton>
              hello world
            </div>
          </div>
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};
