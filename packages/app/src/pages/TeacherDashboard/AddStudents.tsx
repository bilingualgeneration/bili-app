import { IonButton, IonCard, IonCol, IonGrid, IonIcon, IonRow, IonText } from "@ionic/react"
import DeleteIcon from "@/assets/icons/delete_button.svg";
import { create, createSharp, createOutline, addOutline, addSharp, cloudDownloadOutline } from "ionicons/icons";
import AddButton from "@/assets/icons/add_button.svg";
import { AddStudentRow } from "@/components/AddStudentRow";
import "./AddStudents.scss";
import { useState } from "react";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";

export const AddStudents: React.FC = () => {

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            primaryEmail: "",
            secondaryEmail: "",
        },

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

    const [isAdding, setIsAdding] = useState(true);

    const handleAddStudentClick = () => {
        setIsAdding(true);
    };

    const handleSaveStudentClick = (data: any) => {
        setStudentsData([...studentsData, data]);
        //setIsAdding(false);
        reset();
    };

    const handleDeleteStudent = (index: number) => {
        const updatedStudents = studentsData.filter((_, i) => i !== index);
        setStudentsData(updatedStudents);
        setIsAdding(false);
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
                        />

                        {/* row for inputting student data */}
                        
                             <form onSubmit={handleSubmit(handleSaveStudentClick)}>
                                <IonRow className="text-sm color-suelo">
                                <IonCol size="2">
                                    <Input
                                        placeholder="First name"
                                        control={control} 
                                        name="firstName"                                  />
                                </IonCol>
                                <IonCol size="2">
                                    <Input
                                        placeholder="Last name"
                                        control={control} 
                                        name="lastName"                                 />
                                </IonCol>
                                <IonCol size="3">
                                    <Input
                                        placeholder="Primary email"
                                        control={control} 
                                        name="primaryEmail"                                    />
                                </IonCol>
                                <IonCol size="3">
                                    <Input
                                        placeholder="Secondary email" 
                                        control={control} 
                                        name="secondaryEmail"                                   />
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
                                         onClick={() => {reset();}}
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
                        {/* <IonButton onClick={handleAddStudentClick} className="add-student-button text-sm semibold">
                            <IonIcon src={AddButton} />
                            <p>
                                Add another student
                            </p>
                        </IonButton> */}
                        <button className="upload-csv-button text-sm semibold color-selva">
                            <IonIcon src={cloudDownloadOutline} />
                            <p>
                                Upload .CSV
                            </p>

                        </button>
                    </div>

            </IonCard>
        </div>
    )
}