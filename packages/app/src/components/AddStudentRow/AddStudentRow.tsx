//A.M.
import React, { useState } from "react";
import {
  IonRow,
  IonCol,
  IonIcon,
  IonPopover,
  IonContent,
  IonAlert,
  IonButton,
} from "@ionic/react";
import DeleteIcon from "@/assets/icons/delete_button.svg";
import EditIcon from "@/assets/icons/edit_button.svg";
import "./AddStudentRow.scss";
import { useForm } from "react-hook-form";
import { Input } from "../Input";

type RowProps = {
  studentData: {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    secondaryEmail: string;
  }[];
  colSizes?: string[]; // Array of sizes for each column
  handleDeleteStudent: (index: number) => void; //function to delete student
  handleEditStudentClick: (data: any, index: number) => void; //function to save student
};

export const AddStudentRow: React.FC<RowProps> = ({
  studentData,
  colSizes = ["2", "2", "3", "3", "1", "1"],
  handleDeleteStudent,
  handleEditStudentClick,
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null); // Tracks which row is being edited
  const { control, handleSubmit, setValue, reset } = useForm();

  // Handle the "Edit" button click
  const handleEditClick = (index: number, student: any) => {
    setIsEditing(index); // Set the row into edit mode
    setValue("firstName", student.firstName);
    setValue("lastName", student.lastName);
    setValue("primaryEmail", student.primaryEmail);
    setValue("secondaryEmail", student.secondaryEmail);
  };

  // Handle save when the form is submitted
  const onSaveClick = (data: any, index: number) => {
    handleEditStudentClick(data, index); // Save the updated student data
    setIsEditing(null); // Exit the edit mode
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
              <IonCol className="ion-no-padding" size={colSizes[0]}>
                <Input
                  control={control}
                  name="firstName"
                  placeholder={student.firstName}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol className="ion-no-padding" size={colSizes[1]}>
                <Input
                  control={control}
                  name="lastName"
                  placeholder={student.lastName}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol className="ion-no-padding" size={colSizes[2]}>
                <Input
                  control={control}
                  name="primaryEmail"
                  placeholder={student.primaryEmail}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol className="ion-no-padding" size={colSizes[3]}>
                <Input
                  control={control}
                  name="secondaryEmail"
                  placeholder={student.secondaryEmail}
                  className="custom-input-student-class"
                />
              </IonCol>
              <IonCol className="ion-no-padding" size={"auto"}>
                <button
                  type="submit"
                  className="save-student-data-button text-sm semibold"
                >
                  Save
                </button>
              </IonCol>
              <IonCol className="ion-no-padding" size={"auto"}>
                <button
                  type="button"
                  className="edit-student-data-button text-sm semibold"
                  onClick={() => setIsEditing(null)}
                >
                  Cancel
                </button>
              </IonCol>
            </IonRow>
          </form>
        ) : (
          // Normal mode: renders the student's data
          <IonRow
            key={index}
            className={`text-sm color-suelo add-student-row ion-align-items-center ion-justify-content-around ${
              index % 2 === 0 ? "even-row" : "odd-row"
            }`}
          >
            <IonCol size={colSizes[0]}>{student.firstName}</IonCol>
            <IonCol size={colSizes[1]}>{student.lastName}</IonCol>
            <IonCol size={colSizes[2]}>{student.primaryEmail}</IonCol>
            <IonCol size={colSizes[3]}>{student.secondaryEmail}</IonCol>
            <IonCol size={"auto"}>
              <button
                onClick={() => handleEditClick(index, student)}
                className="student-row-edit-button"
              >
                <IonIcon icon={EditIcon} />
              </button>
            </IonCol>
            <IonCol size={"auto"}>
              <button
                id={`present-alert ${index}`}
                className="student-row-delete-button"
              >
                <IonIcon icon={DeleteIcon} />
              </button>
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
                      console.log("Alert canceled");
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
