import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { useClassroom } from "@/hooks/Classroom";
import { useParams } from "react-router";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import Clock from "@/assets/icons/clock.svg";
import "./ClassProgress.scss";

export const ClassProgress: React.FC = () => {
  const { info } = useClassroom();
  const { classroomId } = useParams<{ classroomId: string }>();

  return (
    <div className="progrees-main-block">
      {/* header */}
      <div className="class-progress-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {info.name}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold overview-text-header">
                  Progress
                </IonText>
              </div>
              <div className="progress-header-block">
                <IonText className="text-3xl semibold">{"Progress"}</IonText>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>
      {/* progress graphs */}
      <div className="progress-graphs">
        <IonGrid>
          <IonRow>
            <IonCol className="hours-column" size="3">
              <div className="progress-hours-block">
                <p className="progress-hours-data text-4xl semibold">{"148"}</p>
                <IonIcon icon={Clock}></IonIcon>
              </div>
              <p className="progress-hours-text text-xl semibold">
                Learning Hours
              </p>
            </IonCol>
            <IonCol className="standarts-column" size="3">
              <p className="progress-hours-data text-4xl semibold">21/36</p>

              <p className="progress-hours-text text-xl semibold">
                Standarts completed
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <div className="progress-data-block">
        <IonAccordionGroup expand="inset">
          <IonAccordion value="">
            <IonItem lines="none" slot="header" color="light">
              <IonLabel className="text-2xl semibold">
                Activities Completed
              </IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              SOME DATA
            </div>
          </IonAccordion>
        </IonAccordionGroup>
        <IonAccordionGroup expand="inset">
          <IonAccordion value="">
            <IonItem lines="none" slot="header" color="light">
              <IonLabel className="text-2xl semibold">
                Skills Development
              </IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              SOME DATA
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </div>
    </div>
  );
};
