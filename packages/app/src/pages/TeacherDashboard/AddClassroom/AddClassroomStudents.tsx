//A.M.
import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import DeleteIcon from "@/assets/icons/delete_button.svg";
import {
  create,
  createSharp,
  createOutline,
  addOutline,
  addSharp,
  cloudDownloadOutline,
} from "ionicons/icons";
import AddButton from "@/assets/icons/add_button.svg";
import { AddStudentRow } from "@/components/AddStudentRow";
import { useState } from "react";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { Student, useAddClassroom } from "./AddClassroomContext";
import "./AddClassroomStudents.css";
import { AddStudents } from "@/components/AddStudents";

export const AddClassroomStudents: React.FC = () => {
  const history = useHistory();
  const { students, setStudents } = useAddClassroom();
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const [studentsData, setStudentsData] = useState<Student[]>(students);

  // TODO: check saving function
  const handleSaveStudentClick = (data: any) => {
    setStudentsData([...studentsData, data]);
    reset();
  };

  const handleEditStudentClick = (data: any, index: number) => {
    // Updates the student data directly at the specified index
    studentsData[index] = data;
    // Updates the state
    setStudentsData([...studentsData]);
    // Resets the form
    reset();
  };

  const handleDeleteStudent = (index: number) => {
    const updatedStudents = studentsData.filter(
      (_: any, i: number) => i !== index,
    );
    setStudentsData(updatedStudents);
  };

  const handleContinue = () => {
    // TODO: add any data in the add student row that hasn't been added yet
    setStudents(studentsData);
    history.push("/classrooms/add/notification-method");
  };

  return (
    <div id="add-students-page">
      <IonCard style={{ maxWidth: 1065, margin: "auto", marginTop: "24px" }}>
        <IonText className="ion-text-center">
          <h3 className="add-students-title text-3xl semibold color-suelo">
            Add your students
          </h3>
        </IonText>

        <AddStudents
          studentsData={studentsData}
          handleSaveStudentClick={handleSaveStudentClick}
          handleEditStudentClick={handleEditStudentClick}
          handleDeleteStudent={handleDeleteStudent}
        />

        <div className="add-and-upload-buttons">
          {/* TEMPORARY Hidden Button For .CSV files */}
          {/* <button className="upload-csv-button text-sm semibold color-selva">
            <IonIcon src={cloudDownloadOutline} />
            <p>Upload .CSV</p>
          </button> */}
        </div>

        <div className="add-student-button-continue">
          <IonButton
            data-testid="add-student-continue-button"
            onClick={handleContinue}
            shape="round"
            type="button"
          >
            <FormattedMessage
              id="common.continue"
              defaultMessage="Continue"
              description="Button label to continue"
            />
          </IonButton>
        </div>
      </IonCard>
    </div>
  );
};
