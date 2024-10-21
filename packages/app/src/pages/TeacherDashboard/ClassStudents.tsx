import { addOutline, addSharp } from "ionicons/icons";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
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
import "./ClassStudents.css";

export const ClassStudents: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  return (
    <FirestoreDocProvider
      collection="classroom"
      id={classroomId}
      populate={{
        classroomAnalytics: ["classroom", "==", classroomId],
      }}
    >
      <ClassStudentsLoader />
    </FirestoreDocProvider>
  );
};

const ClassStudentsLoader: React.FC = () => {
  const { status, data } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <></>;
    case "error":
      return <>error</>;
    case "ready":
      return (
        <HydratedClassStudents
          data={data.classroomAnalytics[0].studentSummary}
        />
      );
  }
  return <></>;
};

const HydratedClassStudents: React.FC = ({ data }) => {
  const { classroomId } = useParams<{ classroomId: string }>();
  return (
    <div id="teacher-dashboard-students">
      {/* header */}
      <div className="class-students-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {"1-st grade Spanish"}
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
                    to={`/classrooms/view/${classroomId}/add_students`}
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
          {data.map((student) => (
            <IonRow
              className="ion-align-items-center class-student-table-body-row"
              key={student.id}
            >
              <IonCol>
                <StudentInfo
                  id={student.id}
                  type={"student"}
                  link={`/classrooms/view/${classroomId}/students/view/${student.id}`}
                  size="xs"
                />
              </IonCol>
              <IonCol>
                {student.tags?.map((tag) => <Tag key={tag} id={tag} />)}
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </div>
      {/* banner temporary commented out*/}

      {/* <div className="class-students-banner-styles">
        <IonCard className="card-blog">
          <div>
            <IonGrid>
              <IonRow class="ion-align-items-center banner-row">
                <IonCol size="1">
                  <img src={StudentsReadingPicture} alt="" />
                </IonCol>
                <IonCol>
                  <p className="text-xl semibold color-suelo">
                    Alert banner of some sort
                  </p>
                  <p>Get notified when students need help!</p>
                </IonCol>
                <IonCol size="2" className="button-column">
                  <button className="get-notified-button">
                    <a
                      href="https://thebiliapp.com/blog/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-sm semibold">Learn more</p>
                    </a>
                  </button>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonCard>
      </div> */}
    </div>
  );
};

const TagLookup = {
  "needs support": "danger",
  "home account inactive": "warning",
};

interface Tag {
  id: string;
}

const Tag: React.FC<Tag> = ({ id }) => {
  return (
    <IonBadge className="studentProgressTag" color={TagLookup[id]} mode="md">
      {id}
    </IonBadge>
  );
};
