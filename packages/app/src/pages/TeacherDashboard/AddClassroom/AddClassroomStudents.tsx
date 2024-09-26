import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
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
      <IonCard>
        <div style={{ width: "33%", margin: "auto" }}>
          <IonProgressBar color="primary" value={0.6} />
        </div>
        <IonText>
          <h2 className="text-3xl semibold color-suelo">Add your students</h2>
          <hr />
        </IonText>
        <IonGrid className="add-students-grid">
          {/* title row */}
          <IonRow className="first-title-row text-md color-suelo semibold">
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
            onEditingStatusChange={() => {
              // TODO: what goes here?
            }}
          />

          {/* row for inputting student data */}

          <form onSubmit={handleSubmit(handleSaveStudentClick)}>
            <IonRow className="text-sm color-suelo">
              <IonCol size="3">
                <Input
                  placeholder="First name"
                  control={control}
                  name="firstName"
                />
              </IonCol>
              <IonCol size="3">
                <Input
                  placeholder="Last name"
                  control={control}
                  name="lastName"
                />
              </IonCol>
              <IonCol size="2">
                <Input
                  placeholder="Primary email"
                  control={control}
                  name="primaryEmail"
                />
              </IonCol>
              <IonCol size="2">
                <Input
                  placeholder="Secondary email"
                  control={control}
                  name="secondaryEmail"
                />
              </IonCol>
              <IonCol size="1" className="ion-text-center">
                <IonButton type="submit">Add</IonButton>
              </IonCol>
              <IonCol size="1" className="ion-text-center">
                <IonButton
                  className="curved-corners"
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
        <div className="add-and-upload-buttons">
          {/* TEMPORARY Hidden Button For .CSV files */}
          {/* <button className="upload-csv-button text-sm semibold color-selva">
            <IonIcon src={cloudDownloadOutline} />
            <p>Upload .CSV</p>
          </button> */}
        </div>

        <div style={{ margin: "auto", width: 400 }}>
          <IonButton
            className="elevate"
            onClick={handleContinue}
            expand="full"
            shape="round"
            type="button"
          >
            <FormattedMessage id="common.continue" />
          </IonButton>
        </div>
      </IonCard>
    </div>
  );
};
