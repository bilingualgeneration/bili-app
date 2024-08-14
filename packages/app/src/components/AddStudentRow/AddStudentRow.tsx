import React from 'react';
import { IonRow, IonCol, IonIcon } from '@ionic/react';
import DeleteIcon from "@/assets/icons/delete_button.svg";
import { create, createSharp, createOutline, addOutline, addSharp, cloudDownloadOutline } from "ionicons/icons";

type RowProps = {
    studentData: {
        firstName: string;
        lastName: string;
        primaryEmail: string;
        secondaryEmail: string;
    }[];
    colSizes?: string[]; // Array of sizes for each column
};


export const AddStudentRow: React.FC<RowProps> = ({
    studentData,
    colSizes = ['2','2', '3', '3', '1', '1'],
}) => {

    return (
        <>
            {studentData.map((student, index) => (
                <IonRow key={index} className="text-sm color-suelo">
                    <IonCol size={colSizes[0]}>{student.firstName}</IonCol>
                    <IonCol size={colSizes[1]}>{student.lastName}</IonCol>
                    <IonCol size={colSizes[2]}>{student.primaryEmail}</IonCol>
                    <IonCol size={colSizes[3]}>{student.secondaryEmail}</IonCol>
                    <IonCol size={colSizes[4]}>
                            <IonIcon 
                            icon={DeleteIcon} 
                            style={{fontSize: '20px',}}
                            />
                    </IonCol>
                    <IonCol size={colSizes[5]}>
                        <IonIcon 
                        icon={create} 
                        
                        />
                    </IonCol>
                </IonRow>
           ))}

        </>

    )

}