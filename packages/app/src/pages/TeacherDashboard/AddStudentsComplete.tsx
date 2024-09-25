import { IonButton, IonCard, IonImg, IonText } from "@ionic/react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ClassroomComplete } from "@/components/ClassRoomComplete";

export const AddStudentsComplete: React.FC = () => {
  const history = useHistory();
  const { classroomId } = useParams<{ classroomId: string }>();

  //screen when the process is finished
  return (
    <ClassroomComplete
      h2Text={"Success! You added your students!"}
      isDisabled={false}
      path={`/classrooms/view/:${classroomId}/students`}
    />
  );
};
