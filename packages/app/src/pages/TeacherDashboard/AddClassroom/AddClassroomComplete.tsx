import { IonButton, IonCard, IonImg, IonText } from "@ionic/react";
import { useAddClassroom } from "./AddClassroomContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ClassroomComplete } from "@/components/ClassRoomComplete";

export const AddClassroomComplete: React.FC = () => {
  const { addClassroom, addClassroomStatus } = useAddClassroom();
  const history = useHistory();
  useEffect(() => {
    if (addClassroomStatus === "idle") {
      addClassroom();
    }
  }, [addClassroomStatus]);
  if (addClassroomStatus !== "done") {
    //screen while loading data
    return (
      <ClassroomComplete
        h2Text={"Please wait while we create your class"}
        isDisabled={true}
        path={"/classrooms"}
      />
    );
  } else {
    //screen when the process is finished
    return (
      <ClassroomComplete
        h2Text={"Success! You created your classroom!"}
        isDisabled={false}
        path={"/classrooms"}
      />
    );
  }
};
