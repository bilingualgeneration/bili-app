// TODO: streamline css definitions

import { Avatar } from "@/components/Avatar";
import Flower from "../../assets/icons/profile_chip_flower.svg";
import { I18nMessage } from "@/components/I18nMessage";
import {
  IonText,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonContent,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
  RealtimeDatabaseDocProvider,
  useRealtimeDatabaseDoc,
} from "@/hooks/RealtimeDatabaseDoc";
import { useClassroom } from "@/hooks/Classroom";
import { useHistory, useLocation } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import { useRef, useState } from "react";
import { useStudent } from "@/hooks/Student";

import "./ProfileChip.scss";

import Settings from "@/assets/icons/settings.svg";
import StarNotSharp from "@/assets/icons/star_profile.svg";
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";

interface ProfileChipPopoverLink {
  i18nId: string;
  icon: string;
  url: string;
}

interface ProfileChipProps {
  size?: "default" | "minimal";
}

export const ProfileChip: React.FC<ProfileChipProps> = ({
  size = "default",
}) => {
  const { id } = useStudent();
  return (
    <RealtimeDatabaseDocProvider path={`/users/${id}`}>
      <HydratedProfileChip size={size} />
    </RealtimeDatabaseDocProvider>
  );
};

interface HydratedProfileChipProps {
  size?: "default" | "minimal";
}

const HydratedProfileChip: React.FC<HydratedProfileChipProps> = ({
  size = "default",
}) => {
  const { firstName, id, signOut: signStudentOut } = useStudent();
  const history = useHistory();
  const { pathname } = useLocation();
  const { signout: signUserOut } = useProfile();
  const { unsubscribe: signClassroomOut } = useClassroom();
  /*
  const {
    profile: { role },
  } = 
  */

  const { info } = useClassroom();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);
  const { data, status } = useRealtimeDatabaseDoc();

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  const links: ProfileChipPopoverLink[] = [
    {
      i18nId: "settings.myProfile",
      icon: StudentAvatar,
      url: "/profile/coming-soon",
    },
    /*
    {
      i18nId: "settings.grownup",
      icon: Settings,
      url: role === "teacher" ? "/classrooms" : "/settings/overview",
    },
    */
    {
      i18nId: "settings.changeStudent",
      icon: StudentLogout,
      url: `/classroom/student-select/${info?.id}`,
    },
  ];

  return (
    <>
      <div>
        <button
          onClick={size === "default" ? openPopover : undefined}
          className="custom-button-color"
          id="top-center"
        >
          <div
            id="profileChip"
            className={size === "minimal" ? "profile-chip--minimal" : ""}
          >
            <div id="starPoints" className="text-sm semibold color-nube">
              <IonIcon icon={StarNotSharp} />
              <IonText>
                {status === "ready" ? data?.totalStars ?? 0 : "\u00A0"}
              </IonText>
            </div>
            <div id="heartPoints" className="text-sm semibold color-nube">
              <IonIcon icon={Flower} />
              <IonText>
                {status === "ready" ? data?.totalHearts ?? 0 : "\u00A0"}
              </IonText>
            </div>
            {size === "default" && (
              <>
                <IonText>
                  <p className="semibold color-suelo text-xl">{firstName}</p>
                </IonText>
                <Avatar id={id} size="md" />
              </>
            )}
          </div>
        </button>
      </div>

      {size === "default" && (
        <IonPopover
          ref={popover}
          isOpen={popoverOpen}
          onDidDismiss={() => setPopoverOpen(false)}
          size="auto"
          side="bottom"
          alignment="end"
          trigger="top-center"
          arrow={false}
          className="profile-popover-style"
        >
          <IonContent id="profile-chip-popover" forceOverscroll={false}>
            {links.map((l: ProfileChipPopoverLink) => (
              <Link
                className="no-underline"
                key={l.i18nId}
                onClick={() => {
                  setPopoverOpen(false);
                }}
                to={l.url}
              >
                <IonButton expand="block" fill="clear">
                  <IonIcon icon={l.icon} slot="start" />
                  <IonText className="ion-text-left color-suelo text-md">
                    <I18nMessage id={l.i18nId} />
                    <I18nMessage
                      id={l.i18nId}
                      level={2}
                      wrapper={(text: string) => (
                        <p className="text-sm">{text}</p>
                      )}
                    />
                  </IonText>
                </IonButton>
              </Link>
            ))}
            {pathname.startsWith("/classroom/student-select") && (
              <IonButton
                expand="block"
                fill="clear"
                onClick={() => {
                  signStudentOut();
                  signUserOut();
                  signClassroomOut();
                  history.replace("/");
                  // user sign out
                  // student sign out
                  // classroom sign out
                  // redirect to /
                }}
              >
                <IonText className="ion-text-left color-suelo text-md">
                  <I18nMessage id="common.logOut" />
                  <I18nMessage
                    id="common.logOut"
                    level={2}
                    wrapper={(text: string) => (
                      <p className="text-sm">{text}</p>
                    )}
                  />
                </IonText>
              </IonButton>
            )}
          </IonContent>
        </IonPopover>
      )}
    </>
  );
};
