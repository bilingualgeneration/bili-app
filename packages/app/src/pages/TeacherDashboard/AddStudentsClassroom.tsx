//A.M.
import {
  IonButton,
  IonCard,
  IonItem,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import "./AddStudentsClassroom.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUpData } from "../SignUp/SignUpContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from "react-router";
import { firestore } from "@/components/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useProfile } from "@/hooks/Profile";
import { FormattedMessage } from "react-intl";
import { AddStudents } from "@/components/AddStudents";

export const AddStudentsClassroom: React.FC = () => {
  const { data, setData, pushPage } = useSignUpData();
  const history = useHistory();
  const {
    user: { uid },
    profile: { isImmersive, isInclusive, settingsLanguage },
  } = useProfile();
  const ref = doc(firestore, "users", uid);
  // TODO: we shouldn't allow this straight from the app
  const updateProfile = (key: string, value: any) => {
    updateDoc(ref, {
      [key]: value,
    });
  };

  const [studentsData, setStudentsData] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      primaryEmail: "john.doe@example.com",
      secondaryEmail: "johndoe2@example.com",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      primaryEmail: "jane.smith@example.com",
      secondaryEmail: "janesmith2@example.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      primaryEmail: "john.doe@example.com",
      secondaryEmail: "johndoe2@example.com",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      primaryEmail: "jane.smith@example.com",
      secondaryEmail: "janesmith2@example.com",
    },
  ]);

  const { control, handleSubmit, setValue, reset } = useForm();

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
    const updatedStudents = studentsData.filter((_, i) => i !== index);
    setStudentsData(updatedStudents);
  };

  return (
    <div id="add-students-page">
      <IonCard style={{ maxWidth: 1065, margin: "auto", marginTop: "1.5rem" }}>
        <IonItem className="add-students-header">
          <IonText className="">
            <h3 className="add-students-title text-3xl semibold color-suelo">
              Add your students
            </h3>
          </IonText>
        </IonItem>

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
          <IonRouterLink routerLink="/classrooms/invite_caregivers">
            <IonButton
              data-testid="add-student-continue-button"
              shape="round"
              type="button"
            >
              <FormattedMessage
                id="common.continue"
                defaultMessage="Continue"
                description="Button label to continue"
              />
            </IonButton>
          </IonRouterLink>
        </div>
      </IonCard>
    </div>
  );
};
