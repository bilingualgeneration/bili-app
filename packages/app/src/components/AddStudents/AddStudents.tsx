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
  console.log("AddStudents Component");
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
              <button
                type="submit"
                className="add-student-button text-sm semibold"
              >
                <p>Add</p>
              </button>
            </IonCol>
            <IonCol size="auto" className="reset-button-column ion-no-padding">
              <button
                className="reset-student-button text-sm semibold"
                type="button"
                onClick={() => {
                  reset();
                }}
              >
                <p>Reset</p>
              </button>
            </IonCol>
          </IonRow>
        </div>
      </form>
    </IonGrid>
  );
};
