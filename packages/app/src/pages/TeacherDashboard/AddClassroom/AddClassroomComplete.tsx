import { IonButton } from "@ionic/react";
import { useAddClassroom } from "./AddClassroomContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
      <>
        <IonButton
          data-testid="complete-continue-button"
          onClick={() => {
            history.push("/classrooms");
          }}
          shape="round"
        >
          continue
        </IonButton>
      </>
    );
  }
};
