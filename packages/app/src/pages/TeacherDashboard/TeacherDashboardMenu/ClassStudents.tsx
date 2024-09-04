//A.M.
import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import "./ClassStudents.scss";
import { Link } from "react-router-dom";

export const ClassStudents: React.FC = () => {
  return (
    <div id="">
      {/* header text */}
      <div className="overview-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {"1-st grade Spanish"}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold overview-text-header">
                  Overview
                </IonText>
              </div>
              <div className="classroom-name-block">
                <IonText className="text-3xl semibold">{"Students"}</IonText>
                <button className="visit-students-button">
                  <Link to={`/classrooms/add`} className="no-underline">
                    <p className="text-md semibold color-suelo">Add students</p>
                  </Link>
                </button>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>
    </div>
  );
};
