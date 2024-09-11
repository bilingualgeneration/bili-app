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
import { useLanguageToggle } from "@/components/LanguageToggle";
import SchoolIcon from "@/assets/icons/school.svg";
import HelpIcon from "@/assets/icons/help.svg";
import { useEffect } from "react";

import "./TeacherDashboardWrapper.css";
import { SideMenu } from "./Settings/SideMenu";

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
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};
