//A.M.
import { IonButton, IonCard, IonCol, IonGrid, IonIcon, IonRouterLink, IonRow, IonText } from "@ionic/react"
import DeleteIcon from "@/assets/icons/delete_button.svg";
import { create, createSharp, createOutline, addOutline, addSharp, cloudDownloadOutline } from "ionicons/icons";
import AddButton from "@/assets/icons/add_button.svg";
import { AddStudentRow } from "@/components/AddStudentRow";
import "./AddStudents.scss";
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

export const AddStudents: React.FC = () => {
  
    const { data, setData, pushPage } = useSignUpData();
    const history = useHistory();
    const { user: { uid }, profile: { isImmersive, isInclusive, settingsLanguage } } = useProfile();
    const ref = doc(firestore, "users", uid);
    // TODO: we shouldn't allow this straight from the app
    const updateProfile = (key: string, value: any) => {
        updateDoc(ref, {
            [key]: value,
        });
    };
    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({
        mode: "onBlur",
        
    });
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

    // TODO: check saving function
    const handleSaveStudentClick = (data: any) => {
        setStudentsData([...studentsData, data]);
        reset();
    };

    const handleEditStudentClick =  (data: any, index: number) => {
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
            <IonCard style={{ maxWidth: 1065, margin: "auto", marginTop: "24px", }}>

                <IonText className="ion-text-center">
                    <h3 className="add-students-title text-3xl semibold color-suelo">
                        Add your students
                    </h3>
                </IonText>
                <IonGrid className="add-students-grid">
                    {/* title row */}
                    <IonRow className="first-title-row text-md color-suelo semibold">
                        <IonCol size="2">
                            Student first name
                        </IonCol>
                        <IonCol size="2">
                            Student last name
                        </IonCol>
                        <IonCol size="3">
                            Primary home contact email
                        </IonCol>
                        <IonCol size="3">
                            Secondary home contact email
                        </IonCol>
                        <IonCol>

                        </IonCol>
                        <IonCol>

                        </IonCol>
                    </IonRow>

                    {/* rows with student data */}
                    <AddStudentRow
                        studentData={studentsData}
                        handleDeleteStudent={handleDeleteStudent} 
                        handleEditStudentClick={handleEditStudentClick}                    
                    />
      
                    {/* row for inputting student data */}

                    <form onSubmit={handleSubmit(handleSaveStudentClick)}>
                        <IonRow className="text-sm color-suelo">
                            <IonCol size="2">
                                <Input
                                    placeholder="First name"
                                    control={control}
                                    name="firstName" />
                            </IonCol>
                            <IonCol size="2">
                                <Input
                                    placeholder="Last name"
                                    control={control}
                                    name="lastName" />
                            </IonCol>
                            <IonCol size="3">
                                <Input
                                    placeholder="Primary email"
                                    control={control}
                                    name="primaryEmail" />
                            </IonCol>
                            <IonCol size="3">
                                <Input
                                    placeholder="Secondary email"
                                    control={control}
                                    name="secondaryEmail" />
                            </IonCol>
                            <IonCol size="1">
                                <button
                                    type="submit"
                                    className="add-student-button text-sm semibold"
                                >
                                    <IonIcon src={AddButton} />
                                    <p>
                                        Add student
                                    </p>
                                </button>
                            </IonCol>
                            <IonCol
                                size="1"
                                className="reset-button-column"
                            >
                                <button
                                    className="reset-student-button text-sm semibold"
                                    type="button"
                                    onClick={() => { reset(); }}
                                >
                                    <p>
                                        Reset
                                    </p>
                                </button>
                            </IonCol>
                        </IonRow>
                    </form>

                </IonGrid>
                <div className="add-and-upload-buttons">

                    <button className="upload-csv-button text-sm semibold color-selva">
                        <IonIcon src={cloudDownloadOutline} />
                        <p>
                            Upload .CSV
                        </p>

                    </button>
                </div>

                <IonRouterLink routerLink="/classrooms/invite_caregivers">
                    <IonButton
                        data-testid="caregiver-select-continue-button"
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

            </IonCard>
        </div>
    )
}


