//A.M.
import React, { useState } from "react";
import { IonRow, IonCol, IonIcon, IonAlert, IonButton } from "@ionic/react";
import DeleteIcon from "@/assets/icons/delete_button.svg";
import EditIcon from "@/assets/icons/edit_button.svg";
import "./AddStudentRow.scss";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import type { Student } from "@/pages/TeacherDashboard/AddClassroom/AddClassroomContext";

type RowProps = {
  studentData: Student[];
  colSizes?: string[]; // Array of sizes for each column
  handleDeleteStudent: (index: number) => void; //function to delete student
  handleEditStudentClick: (data: any, index: number) => void; //function to save student
  onEditingStatusChange: (editing: boolean) => void; //function to check edit status
};

export const AddStudentRow: React.FC<RowProps> = ({
  studentData,
  colSizes = ["3", "3", "2", "2", "2"],
  handleDeleteStudent,
  handleEditStudentClick,
  onEditingStatusChange,
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null); // Tracks which row is being edited
  const { control, handleSubmit, setValue, reset } = useForm();
  // Handle the "Edit" button click
  const handleEditClick = (index: number, student: any) => {
    setIsEditing(index); // Set the row into edit mode
    onEditingStatusChange(true); // Notify AddStudents.tsx that editing has started
    setValue("firstName", student.firstName);
    setValue("lastName", student.lastName);
    setValue("primaryEmail", student.primaryEmail);
    setValue("secondaryEmail", student.secondaryEmail);
  };

  // Handle save when the form is submitted
  const onSaveClick = (data: any, index: number) => {
    handleEditStudentClick(data, index); // Save the updated student data
    setIsEditing(null); // Exit the edit mode
    onEditingStatusChange(false); // Notify AddStudents.tsx that editing has ended
  };

  return (
    <div id="add-student-row-component">
      {studentData.map((student, index) =>
        isEditing === index ? (
          // Edit mode: renders input fields for editing

          <form onSubmit={handleSubmit((data) => onSaveClick(data, index))}>
            <IonRow
              key={index}
              className={
                "text-sm color-suelo ion-align-items-center ion-justify-content-around edit-student-data"
              }
            >
              <IonCol size="3">
                <Input
                  control={control}
                  name="firstName"
                  placeholder={student.firstName}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol size={"3"}>
                <Input
                  control={control}
                  name="lastName"
                  placeholder={student.lastName}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol size={"2"}>
                <Input
                  control={control}
                  name="primaryEmail"
                  placeholder={student.primaryEmail}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol size="2">
                <Input
                  control={control}
                  name="secondaryEmail"
                  placeholder={student.secondaryEmail}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol size="1" className="ion-text-center">
                <IonButton type="submit">Save</IonButton>
              </IonCol>
              <IonCol size="1" className="ion-text-center">
                <IonButton
                  color="secondary"
                  onClick={() => {
                    setIsEditing(null);
                    onEditingStatusChange(false);
                  }}
                >
                  Cancel
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        ) : (
          // Normal mode: renders the student's data
          <IonRow
            key={index}
            className={`text-sm color-suelo add-student-row ion-align-items-center ${
              index % 2 === 0 ? "even-row" : "odd-row"
            }`}
          >
            <IonCol size={"3"}>{student.firstName}</IonCol>
            <IonCol size={"3"}>{student.lastName}</IonCol>
            <IonCol size={"2"}>{student.primaryEmail}</IonCol>
            <IonCol size={"2"}>{student.secondaryEmail}</IonCol>
            <IonCol size={"1"} className="ion-text-center">
              <IonButton
                fill="clear"
                size="small"
                onClick={() => handleEditClick(index, student)}
              >
                <IonIcon
                  slot="icon-only"
                  icon={EditIcon}
                  style={{ width: 10 }}
                />
              </IonButton>
            </IonCol>
            <IonCol size={"1"} className="ion-text-center">
              <IonButton
                fill="clear"
                size="small"
                id={`present-alert ${index}`}
              >
                <IonIcon
                  slot="icon-only"
                  icon={DeleteIcon}
                  style={{ width: 10 }}
                />
              </IonButton>
              <IonAlert
                header="Delete Student"
                subHeader="Are you sure about this?"
                trigger={`present-alert ${index}`}
                className="custom-alert-delete-student"
                buttons={[
                  {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => {
                      // TODO: handle cancel
                    },
                  },
                  {
                    text: "Delete",
                    role: "destructive",
                    handler: () => {
                      handleDeleteStudent(index);
                    },
                  },
                ]}
              ></IonAlert>
            </IonCol>
          </IonRow>
        ),
      )}
    </div>
  );
};
