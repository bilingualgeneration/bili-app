//A.M.
import React, { useState } from 'react';
import { IonRow, IonCol, IonIcon, IonPopover, IonContent, IonAlert, IonButton } from '@ionic/react';
import DeleteIcon from "@/assets/icons/delete_button.svg";
import { create, createSharp, createOutline, addOutline, addSharp, cloudDownloadOutline } from "ionicons/icons";
import "./AddStudentRow.scss";
import { useForm } from 'react-hook-form';
import { Input } from '../Input';

type RowProps = {
    studentData: {
        firstName: string;
        lastName: string;
        primaryEmail: string;
        secondaryEmail: string;
    }[];
    colSizes?: string[]; // Array of sizes for each column
    handleDeleteStudent: (index: number) => void;//function to delete student
    handleEditStudentClick: (data: any, index: number) => void; //function to save student
};


export const AddStudentRow: React.FC<RowProps> = ({
    studentData,
    colSizes = ['2', '2', '3', '3', '1', '1'],
    handleDeleteStudent,
    handleEditStudentClick,
}) => {

    const [isEditing, setIsEditing] = useState<number | null>(null); // Tracks which row is being edited
    const { control, handleSubmit, setValue, reset } = useForm();

    // Handle the "Edit" button click
    const handleEditClick = (index: number, student: any) => {
        setIsEditing(index); // Set the row into edit mode
        setValue('firstName', student.firstName);
        setValue('lastName', student.lastName);
        setValue('primaryEmail', student.primaryEmail);
        setValue('secondaryEmail', student.secondaryEmail);
    };

    // Handle save when the form is submitted
    const onSaveClick = (data: any, index: number) => {
        handleEditStudentClick(data, index); // Save the updated student data
        setIsEditing(null); // Exit the edit mode
    };


    return (
        <div id='add-student-row-component'>
            {studentData.map((student, index) => (
                <IonRow
                    key={index}
                    className={`text-sm color-suelo add-student-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}
                >
                    {isEditing === index ? (
                        // Edit mode: renders input fields for editing

                        <form onSubmit={handleSubmit((data) => onSaveClick(data, index))}>
                            <IonCol size={colSizes[0]}>
                                <Input
                                   
                                    control={control} 
                                    name="firstName"
                                    placeholder={student.firstName}
                                    required={true}
                                    className="custom-input-student-class" 
                                />
                            </IonCol>
                            <IonCol size={colSizes[1]}>
                                <Input
                                  
                                    control={control} 
                                    name="lastName"
                                    placeholder={student.lastName}
                                    required={true}
                                    className="custom-input-student-class"
                                />
                            </IonCol>
                            <IonCol size={colSizes[2]}>
                                <Input
                                   
                                    control={control} 
                                    name="primaryEmail"
                                    placeholder={student.primaryEmail}
                                    required={true}
                                    className="custom-input-student-class"
                                />
                            </IonCol>
                            <IonCol size={colSizes[3]}>
                                <Input

                                    control={control} 
                                    name="secondaryEmail"
                                    placeholder={student.secondaryEmail}
                                    required={true}
                                    className="custom-input-student-class"
                                />
                            </IonCol>
                            <IonCol size={colSizes[4]}>
                                <IonButton type="submit">Save</IonButton>
                            </IonCol>
                            <IonCol size={colSizes[5]}>
                                <IonButton type="button" onClick={() => setIsEditing(null)}>
                                    Cancel
                                </IonButton>
                            </IonCol>
                        </form>
                    ) : (
                        // Normal mode: renders the student's data
                        <>
                            <IonCol size={colSizes[0]}>{student.firstName}</IonCol>
                            <IonCol size={colSizes[1]}>{student.lastName}</IonCol>
                            <IonCol size={colSizes[2]}>{student.primaryEmail}</IonCol>
                            <IonCol size={colSizes[3]}>{student.secondaryEmail}</IonCol>
                            <IonCol size={colSizes[4]}>
                                <button
                                    onClick={() => handleEditClick(index, student)}
                                    className='student-row-edit-button'
                                    >
                                    <IonIcon
                                        icon={create}
                                    />
                                    </button>
                                
                            </IonCol>
                            <IonCol size={colSizes[5]}>
                                <button
                                    id={`present-alert ${index}`}
                                    className='student-row-delete-button'
                                >
                                    <IonIcon
                                        icon={DeleteIcon}
                                    />
                                </button>
                                <IonAlert
                                    header="Delete Student"
                                    subHeader="Are you sure about this?"
                                    trigger={`present-alert ${index}`}
                                    className="custom-alert-delete-student"
                                    buttons={[
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: () => {
                                                console.log('Alert canceled');
                                            },
                                        },
                                        {
                                            text: 'Delete',
                                            role: 'destructive',
                                            handler: () => {
                                                handleDeleteStudent(index);
                                            },
                                        },
                                    ]}

                                >

                                </IonAlert>


                            </IonCol>

                        </>
                    )}
                </IonRow>
            ))}

        </div>

    )

}