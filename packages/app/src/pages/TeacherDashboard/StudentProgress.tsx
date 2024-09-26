//A.M.
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import "./StudentProgress.css";
import { Link } from "react-router-dom";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";

export const StudentProgress: React.FC = () => {
  return (
    <div>
      <div className="overview-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {"1-st grade Spanish"}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm color-barro overview-text-header">
                  Students
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold overview-text-header">
                  Student Name
                </IonText>
              </div>
              <div className="classroom-name-block">
                <IonText className="text-3xl semibold">
                  {"Student Name"}
                </IonText>
                <div>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonRow>
                          <IonCol></IonCol>
                          <IonCol></IonCol>
                        </IonRow>
                      </IonCol>
                      <IonCol>
                        <IonRow>
                          <IonCol></IonCol>
                          <IonCol></IonCol>
                        </IonRow>
                      </IonCol>
                      <IonCol>
                        <IonRow>
                          <IonCol></IonCol>
                          <IonCol></IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>
    </div>
  );
};
