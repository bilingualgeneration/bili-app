// TODO: rename file to reorganize

import classnames from "classnames";
import { I18nMessage } from "@/components/I18nMessage";
import { IonButton, IonIcon } from "@ionic/react";
import {
  gridOutline,
  informationCircleOutline,
  logOutOutline,
  optionsOutline,
  personOutline,
  statsChartOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import { useClassroom } from "@/hooks/Classroom";
import { useLocation, useParams } from "react-router-dom";
import { useOldProfile } from "@/hooks/OldProfile";
import { useStudent } from "@/hooks/Student";

import "./DashboardMenu.scss";

interface DashboardMenuLink {
  i18nId: string;
  icon: string;
  role: string[];
  url: string;
}

export const DashboardMenu: React.FC = () => {
  const { setInfo: setStudentInfo } = useStudent();
  const location = useLocation();
  const { classroomId } = useParams<{ classroomId: string }>();
  const { unsubscribe: unsubscribeFromClassroom } = useClassroom();
  const { profile, signout } = useOldProfile();
  const links: DashboardMenuLink[] = [
    {
      i18nId: "dashboardMenu.overview",
      icon: gridOutline,
      role: ["teacher"],
      url: `/classrooms/view/${classroomId}`,
    },
    {
      i18nId: "dashboardMenu.overview",
      icon: gridOutline,
      role: ["caregiver"],
      url: "/settings/overview",
    },
    {
      i18nId: "dashboardMenu.students",
      icon: personOutline,
      role: ["teacher"],
      url: `/classrooms/view/${classroomId}/students`,
    },
    {
      i18nId: "dashboardMenu.profile",
      icon: personOutline,
      role: ["caregiver"],
      url: "/settings/profile",
    },
    {
      i18nId: "dashboardMenu.preferences",
      icon: optionsOutline,
      role: ["teacher"],
      url: `/classrooms/view/${classroomId}/preferences`,
    },
    /*
    {
      i18nId: "dashboardMenu.preferences",
      icon: optionsOutline,
      role: ["caregiver"],
      url: "/settings/preferences",
    },
      */
    {
      i18nId: "dashboardMenu.progress",
      icon: statsChartOutline,
      role: ["teacher"],
      url: `/classrooms/view/${classroomId}/progress`,
    },
    {
      i18nId: "dashboardMenu.progress",
      icon: statsChartOutline,
      role: ["caregiver"],
      url: "/settings/progress",
    },
    {
      i18nId: "dashboardMenu.about",
      icon: informationCircleOutline,
      role: ["teacher"],
      url: `/classrooms/view/${classroomId}/about`,
    },
    {
      i18nId: "dashboardMenu.about",
      icon: informationCircleOutline,
      role: ["caregiver"],
      url: "/settings/about",
    },
  ];

  return (
    <div id="dashboard-menu">
      {links
        .filter((l: DashboardMenuLink) => l.role.includes(profile.role))
        .map((l: DashboardMenuLink) => (
          <Link className="no-underline" id={l.i18nId} to={l.url} key={l.url}>
            <IonButton
              className={classnames("dashboard-menu-button", {
                isActive: location.pathname === l.url,
              })}
              expand="block"
              fill="clear"
            >
              <IonIcon icon={l.icon} slot="start" />
              <div className="text-md semibold">
                <I18nMessage id={l.i18nId} languageSource="unauthed" />
              </div>
            </IonButton>
          </Link>
        ))}
      <IonButton
        className="dashboard-menu-button"
        expand="block"
        fill="clear"
        onClick={() => {
          setStudentInfo({
            firstName: null,
            lastName: null,
            id: null,
          });
          unsubscribeFromClassroom();
          signout();
        }}
      >
        <IonIcon icon={logOutOutline} slot="start" />
        <div className="text-md semibold">
          <I18nMessage id={"common.logOut"} languageSource="unauthed" />
        </div>
      </IonButton>
      <div id="version-label" className="margin-top-5 ion-text-right">
        v{import.meta.env.VITE_APP_VERSION}{" "}
        {import.meta.env.VITE_FIREBASE_ENVIRONMENT}
      </div>
    </div>
  );
};
