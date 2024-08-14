import { IonCard, IonCol, IonGrid, IonIcon, IonRow, IonText } from "@ionic/react"
import DeleteIcon from "@/assets/icons/delete_button.svg";
import { create, createSharp, createOutline, addOutline, addSharp, cloudDownloadOutline } from "ionicons/icons";
import AddButton from "@/assets/icons/add_button.svg";
import { AddStudentRow } from "@/components/AddStudentRow";
import "./AddStudents.scss";

export const AddStudents: React.FC = () => {


    const studentsData = [
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
        
      ];

    return (
        
        <div id="add-students-page">
            <IonCard style={{ maxWidth: 1065, margin: "auto", marginTop: "24px", }}>
                <form action="">
                <IonText className="ion-text-center">
                        <h3 className="add-students-title text-3xl semibold color-suelo">
                            Add your students
                        </h3>
                </IonText>
                <IonGrid className="add-students-grid">
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

                    <AddStudentRow studentData={studentsData}/>

                </IonGrid>
                <div className="add-and-upload-buttons">
                    <button className="add-student-button text-sm semibold">
                    <IonIcon src={AddButton}/>
                        <p>
                        Add another student
                        </p>
                    </button>
                    <button className="upload-csv-button text-sm semibold color-selva">
                    <IonIcon src={cloudDownloadOutline}/> 
                    <p>
                        Upload .CSV
                    </p>
                    
                    </button>
                </div>

                </form>
            </IonCard>
        </div>
    )
}