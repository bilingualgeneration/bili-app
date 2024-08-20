import React, { useState } from 'react';
import { IonRow, IonCol, IonIcon, IonPopover, IonContent, IonAlert } from '@ionic/react';
import DeleteIcon from "@/assets/icons/delete_button.svg";
import { create, createSharp, createOutline, addOutline, addSharp, cloudDownloadOutline } from "ionicons/icons";
import "./AddStudentRow.scss";

type RowProps = {
    studentData: {
        firstName: string;
        lastName: string;
        primaryEmail: string;
        secondaryEmail: string;
    }[];
    colSizes?: string[]; // Array of sizes for each column
    handleDeleteStudent: (index: number) => void;
};


export const AddStudentRow: React.FC<RowProps> = ({
    studentData,
    colSizes = ['2', '2', '3', '3', '1', '1'],
    handleDeleteStudent,
}) => {

  
    return (
        <div id='add-student-row-component'>
            {studentData.map((student, index) => (
                <IonRow
                    key={index}
                    className={`text-sm color-suelo add-student-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}

                >
                    <IonCol size={colSizes[0]}>{student.firstName}</IonCol>
                    <IonCol size={colSizes[1]}>{student.lastName}</IonCol>
                    <IonCol size={colSizes[2]}>{student.primaryEmail}</IonCol>
                    <IonCol size={colSizes[3]}>{student.secondaryEmail}</IonCol>
                    <IonCol size={colSizes[4]}>
                        <IonIcon
                            icon={create}

                        />
                    </IonCol>
                    <IonCol size={colSizes[5]}>
                        <button
                            id={`present-alert ${index}`}
                            className='student-row-delete-button'
                            // onClick={() => onDeleteClick(index)}
                        >
                            <IonIcon
                                icon={DeleteIcon}
                            />
                        </button>
                        <IonAlert
                            header="Delete student: "
                            subHeader = "Are you sure about this?"
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
                                    text: 'OK',
                                    role: 'confirm',
                                    handler: () => {
                                        handleDeleteStudent(index);
                                    },
                                },
                            ]}
                            
                        >

                        </IonAlert>


                    </IonCol>
                </IonRow>
            ))}

        </div>

    )

}