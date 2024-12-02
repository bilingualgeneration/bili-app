import { addOutline, addSharp } from "ionicons/icons";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
import { Link, useParams } from "react-router-dom";
import { StudentInfo } from "@/components/StudentInfo";
import { useClassroom } from "@/hooks/Classroom";
import "./ClassStudents.scss";

export const ClassStudents: React.FC = () => {
  const { info } = useClassroom();
  // TODO: remove dependency on useFirestoreDoc and pull classroomAnalytics from useClassroom
  const { data } = useFirestoreDoc();
  const analytics = data.classroomAnalytics[0].studentAnalytics;
  return (
    <div id="teacher-dashboard-students">
      {/* header */}
      <div className="class-students-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {info.name}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold overview-text-header">
                  Students
                </IonText>
              </div>
              <div className="students-header-block">
                <IonText className="text-3xl semibold">{"Students"}</IonText>
                <button className="add-students-button">
                  <IonIcon icon={addSharp}></IonIcon>
                  <Link
                    to={`/classrooms/view/${info.id}/add_students`}
                    className="no-underline"
                  >
                    <p className="text-sm semibold color-nube">Add students</p>
                  </Link>
                </button>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>
      {/* table */}
      <div className="class-students-table">
        <IonGrid className="class-students-table-grid">
          <IonRow className="class-student-table-header-row">
            <IonCol className="text-md semibold">Student</IonCol>
            <IonCol className="text-md semibold">Tags</IonCol>
          </IonRow>
          {Object.values(analytics).map((student: any) => (
            <IonRow
              className="ion-align-items-center class-student-table-body-row"
              key={student.id}
            >
              <IonCol>
                <StudentInfo
                  id={student.id}
                  type={"student"}
                  link={`/classrooms/view/${info.id}/students/view/${student.id}`}
                  size="xs"
                />
              </IonCol>
              <IonCol>
                {student.tags?.map((tag: any) => (
                  <Tag key={tag} tag={tag.tag} />
                ))}
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </div>
    </div>
  );
};

const TagLookup: {
  [key: string]: string;
} = {
  "!": "danger",
  "-": "warning",
  "+": "primary",
};

interface Tag {
  tag: string;
}

const Tag: React.FC<Tag> = ({ tag }) => {
  return (
    <IonBadge
      className="studentProgressTag"
      color={TagLookup[tag[0]]}
      mode="md"
    >
      {tag.slice(1)}
    </IonBadge>
  );
};
