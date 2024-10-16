//A.M.
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";

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
        <IonCol size="3">Student first name</IonCol>
        <IonCol size="3">Student last name</IonCol>
        <IonCol size="2">Primary home email</IonCol>
        <IonCol size="2">Secondary home email</IonCol>
        <IonCol size="2"></IonCol>
      </IonRow>

      {/* rows with student data */}
      <AddStudentRow
        studentData={studentsData}
        handleDeleteStudent={handleDeleteStudent}
        handleEditStudentClick={handleEditStudentClick}
        onEditingStatusChange={handleEditingStatusChange}
      />

      {/* row for inputting student data */}

      <form
        onSubmit={(data) => {
          handleSubmit(handleSaveStudentClick)(data);
          reset();
        }}
      >
        <div>
          <IonRow className="add-student-row text-sm color-suelo ion-align-items-center ion-justify-content-around">
            <IonCol size="3">
              <Input
                placeholder="Student first name"
                control={control}
                disabled={isEditing}
                name="firstName"
                className="custom-input"
              />
            </IonCol>
            <IonCol size="3">
              <Input
                placeholder="Student last name"
                control={control}
                disabled={isEditing}
                name="lastName"
                className="custom-input"
              />
            </IonCol>
            <IonCol size="2">
              <Input
                placeholder="Primary home email"
                control={control}
                disabled={isEditing}
                name="primaryEmail"
                className="custom-input"
              />
            </IonCol>
            <IonCol size="2">
              <Input
                placeholder="Secondary home email"
                control={control}
                disabled={isEditing}
                name="secondaryEmail"
                className="custom-input"
              />
            </IonCol>
            <IonCol size="1">
              <IonButton disabled={isEditing} expand="block" type="submit">
                Add
              </IonButton>
            </IonCol>
            <IonCol size="1">
              <IonButton
                className="secondary"
                disabled={isEditing}
                expand="block"
                type="button"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </IonButton>
            </IonCol>
          </IonRow>
        </div>
      </form>
    </IonGrid>
  );
};
