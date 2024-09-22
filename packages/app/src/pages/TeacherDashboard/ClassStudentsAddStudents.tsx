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

import "./ClassStudentsAddStudents.scss";
import { useState } from "react";
import { Input } from "@/components/Input";
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
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";

interface Student {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail: string;
}

export const ClassStudentsAddStudents: React.FC = () => {
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

  const [studentsData, setStudentsData] = useState<Student[]>([]);

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
    <div id="class-add-students">
      <IonItem className="add-students-header">
        <div>
          <div className="header-overview-arrow">
            <IonText className="text-sm color-barro classroom-name-text">
              {"1-st grade Spanish"}
            </IonText>
            <IonIcon color="medium" icon={ArrowRight}></IonIcon>
            <IonText className="text-sm color-barro overview-text-header">
              Students
            </IonText>
            <IonIcon color="medium" icon={ArrowRight}></IonIcon>
            <IonText className="text-sm semibold overview-text-header">
              Add students
            </IonText>
          </div>
          <div>
            <IonText className="">
              <h3 className="add-students-title text-3xl semibold color-suelo">
                Add your students
              </h3>
            </IonText>
          </div>
        </div>
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
        <IonRouterLink routerLink="/classrooms/:classroomId/students">
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
    </div>
  );
};
