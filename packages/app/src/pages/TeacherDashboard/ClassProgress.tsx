import { IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { useParams } from "react-router";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";

export const ClassProgress: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();

  return (
    <div>
      {/* header */}
      <div className="class-students-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {"1-st grade Spanish"}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold overview-text-header">
                  Progress
                </IonText>
              </div>
              <div className="students-header-block">
                <IonText className="text-3xl semibold">{"Progress"}</IonText>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>
    </div>
  );
};
