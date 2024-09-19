//A.M.
import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonRouterLink,
  IonRow,
  IonText,
} from "@ionic/react";

import { AddStudentRow } from "@/components/AddStudentRow";
import "./AddStudents.scss";
import { useState } from "react";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { Student } from "@/pages/Reports/Student";

export interface Student {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail: string;
}

interface AddStudentsProps {
  studentsData: Student[];
  handleSaveStudentClick: (student: Student) => void;
  handleEditStudentClick: (student: Student, index: number) => void;
  handleDeleteStudent: (index: number) => void;
}
export const AddStudents: React.FC<AddStudentsProps> = ({
  studentsData,
  handleSaveStudentClick,
  handleEditStudentClick,
  handleDeleteStudent,
}) => {
  const { control, handleSubmit, reset } = useForm<Student>();
  const [isEditing, setIsEditing] = useState(false);

  // Callback function to check when editing starts or ends
  const handleEditingStatusChange = (editing: boolean) => {
    setIsEditing(editing);
  };

  return (
    <IonGrid className="add-students-grid">
      {/* title row */}
      <IonRow className="first-title-row text-sm color-suelo semibold ion-align-items-center ion-justify-content-around">
        <IonCol size="2">Student first name</IonCol>
        <IonCol size="2">Student last name</IonCol>
        <IonCol size="3">Primary home email</IonCol>
        <IonCol size="3">Secondary home email</IonCol>
        <IonCol size="1.2"></IonCol>
        <IonCol size="auto"></IonCol>
      </IonRow>

      {/* rows with student data */}
      <AddStudentRow
        studentData={studentsData}
        handleDeleteStudent={handleDeleteStudent}
        handleEditStudentClick={handleEditStudentClick}
        onEditingStatusChange={handleEditingStatusChange}
      />

      {/* row for inputting student data */}

      <form onSubmit={handleSubmit(handleSaveStudentClick)}>
        <div>
          <IonRow className="add-student-row text-sm color-suelo ion-align-items-center ion-justify-content-around">
            <IonCol className="ion-no-padding" size="2">
              <Input
                placeholder="Student first name"
                control={control}
                name="firstName"
                className="custom-input"
              />
            </IonCol>
            <IonCol className="ion-no-padding" size="2">
              <Input
                placeholder="Student last name"
                control={control}
                name="lastName"
                className="custom-input"
              />
            </IonCol>
            <IonCol className="ion-no-padding" size="3">
              <Input
                placeholder="Primary home email"
                control={control}
                name="primaryEmail"
                className="custom-input"
              />
            </IonCol>
            <IonCol className="ion-no-padding" size="3">
              <Input
                placeholder="Secondary home email"
                control={control}
                name="secondaryEmail"
                className="custom-input"
              />
            </IonCol>
            <IonCol className="ion-no-padding" size="auto">
              <IonButton
                data-testid="add-student-classroom-button"
                className="add-student-button text-sm semibold"
                disabled={isEditing}
                type="submit"
              >
                <p>Add</p>
              </IonButton>
            </IonCol>
            <IonCol size="auto" className="reset-button-column ion-no-padding">
              <IonButton
                className="reset-student-button text-sm semibold"
                type="button"
                disabled={isEditing}
                onClick={() => {
                  reset();
                }}
              >
                <p>Reset</p>
              </IonButton>
            </IonCol>
          </IonRow>
        </div>
      </form>
    </IonGrid>
  );
};
