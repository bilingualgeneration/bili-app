import { useProfile } from "@/hooks/Profile";
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import {
  arrowBackOutline,
  gridOutline,
  informationCircleOutline,
  logOutOutline,
  optionsOutline,
  personOutline,
  statsChartOutline,
} from "ionicons/icons";
import { FormattedMessage } from "react-intl";
import "./SideMenu.scss";
import { SideMenuOption } from "./SideMenuOption";
import { useClassroom } from "@/hooks/Classroom";
import { useIntl } from "react-intl";
import { useLocation, useParams } from "react-router-dom";
import { useStudent } from "@/hooks/Student";

interface Option {
  icon: any;
  label: any;
  to: string;
  isActive?: boolean;
}

export const SideMenu: React.FC = () => {
  const { setInfo: setStudentInfo } = useStudent();
  const location = useLocation();
  const { classroomId } = useParams<{ classroomId: string }>();
  const { profile, signout } = useProfile();
  const options: Option[] = [
    {
      icon: gridOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.overview"}
          defaultMessage={"Overview"}
          description={"Overview label for side menu on settings page"}
        />
      ),
      to:
        profile.role === "teacher"
          ? `/classrooms/view/${classroomId}`
          : "/settings/overview",
      isActive:
        location.pathname ===
        (profile.role === "teacher"
          ? `/classrooms/view/${classroomId}`
          : "/settings/overview"),
    },
    {
      icon: personOutline,
      label:
        profile.role === "teacher" ? (
          "Students"
        ) : (
          <FormattedMessage
            id={"sideMenu.profile"}
            defaultMessage={"Profile"}
            description={"Profile label for side menu on settings page"}
          />
        ),
      to:
        profile.role === "teacher"
          ? `/classrooms/view/${classroomId}/students`
          : "/settings/profile",
      isActive:
        location.pathname ===
        (profile.role === "teacher"
          ? `/classrooms/view/${classroomId}/students`
          : "/settings/profile"),
    },
    {
      icon: optionsOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.preferences"}
          defaultMessage={"Preferences"}
          description={"Preferences label for side menu on settings page"}
        />
      ),
      to:
        profile.role === "teacher"
          ? `/classrooms/view/${classroomId}/preferences`
          : "/settings/preferences",
      isActive:
        location.pathname ===
        (profile.role === "teacher"
          ? `/classrooms/view/${classroomId}/preferences`
          : "/settings/preferences"),
    },
    {
      icon: statsChartOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.progress"}
          defaultMessage={"Progress"}
          description={"Progress label for side menu on settings page"}
        />
      ),
      to:
        profile.role === "teacher"
          ? `/classrooms/view/${classroomId}/progress`
          : "/settings/progress",
      isActive:
        location.pathname ===
        (profile.role === "teacher"
          ? `/classrooms/view/${classroomId}//progress`
          : "/settings/progress"),
    },
    {
      icon: informationCircleOutline,
      label: (
        <FormattedMessage
          id={"sideMenu.about"}
          defaultMessage={"About Bili"}
          description={"About label for side menu on settings page"}
        />
      ),
      // TODO: route should be fixed for parent account
      to:
        profile.role === "teacher"
          ? `/classrooms/view/${classroomId}/about`
          : "/settings/about",

      isActive:
        location.pathname ===
        (profile.role === "teacher"
          ? `/classrooms/view/${classroomId}/about`
          : "/settings/about"),
    },
  ];

  return (
    <div id="settings-side-menu" style={{ height: "100%" }}>
      <IonList
        lines="none"
        style={{ height: "100%" }}
        className="side-menu-styles"
      >
        {options.map((option, index) => (
          <SideMenuOption key={index} {...option} />
        ))}
        <div
          onClick={() => {
            setStudentInfo({
              firstName: null,
              lastName: null,
              id: null,
            });

            signout();
          }}
        >
          <SideMenuOption
            icon={logOutOutline}
            label={
              <FormattedMessage
                id={"common.logOut"}
                defaultMessage={"Log out"}
                description={"Label to log out"}
              />
            }
          />
        </div>
        <IonItem>
          <IonLabel>v{import.meta.env.VITE_APP_VERSION}</IonLabel>
        </IonItem>
      </IonList>
    </div>
  );
};
