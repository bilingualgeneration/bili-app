import { IonButton, IonCard, IonImg, IonText } from "@ionic/react";
import { useAddClassroom } from "./AddClassroomContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./AddClassroomComplete.css";

export const AddClassroomComplete: React.FC = () => {
  const { addClassroom, addClassroomStatus } = useAddClassroom();
  const history = useHistory();
  useEffect(() => {
    if (addClassroomStatus === "idle") {
      addClassroom();
    }
  }, [addClassroomStatus]);
  if (addClassroomStatus !== "done") {
    return <>loading</>;
  } else {
    return (
      <div className="add-class-success">
        <IonCard>
          <IonText className="ion-text-center margin-bottom-3">
            <h2 className="text-3xl semibold color-suelo">
              Success! You created your classroom!
            </h2>
          </IonText>

          <IonImg
            style={{
              width: "337.25px",
              height: "333px",
            }}
            src="/assets/img/happy_cactus.png"
          />

          <IonButton
            className="margin-vertical-3"
            data-testid="complete-continue-button"
            onClick={() => {
              history.push("/classrooms");
            }}
            shape="round"
          >
            Continue
          </IonButton>
        </IonCard>
      </div>
    );
  }
};
