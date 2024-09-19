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
import { useLocation } from "react-router-dom";
import { useStudent } from "@/hooks/Student";
import { useClassroom } from "@/hooks/Classroom";
import { useIntl } from "react-intl";

interface Option {
  icon: any;
  label: any;
  to: string;
  isActive?: boolean;
}

export const SideMenu: React.FC = () => {
  const { signout } = useProfile();
  const { setInfo: setClassroomInfo } = useClassroom();
  const { setInfo: setStudentInfo } = useStudent();
  const location = useLocation();
  const { profile } = useProfile();

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
      to: "/settings/overview",
      isActive: location.pathname === "/settings/overview",
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
          ? "/classrooms/:classroomId/students"
          : "/settings/profile",
      isActive: location.pathname === "/settings/profile",
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
      to: "/settings/preferences",
      isActive: location.pathname === "/settings/preferences",
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
      to: "/settings/progress",
      isActive: location.pathname === "/settings/progress",
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
      to: "/settings/about",
      isActive: location.pathname === "/settings/about",
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
            setClassroomInfo({
              name: null,
              schoolId: null,
              id: null,
            });
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
        <div className="ion-text-right">
          v{import.meta.env.VITE_APP_VERSION}
        </div>
      </IonList>
    </div>
  );
};
