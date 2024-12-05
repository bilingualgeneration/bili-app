// TODO: streamline css definitions

import { Avatar } from "@/components/Avatar";
import { heart } from "ionicons/icons";
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
import { useProfile } from "@/hooks/Profile";
import { useRef, useState } from "react";
import { useScreenSize } from "@/lib/screenSize";
import { useStudent } from "@/hooks/Student";

import "./ProfileChip.scss";

import Settings from "@/assets/icons/settings.svg";
import StarNotSharp from "@/assets/icons/star_profile.svg";
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";

export const ProfileChip: React.FC = () => {
  const { id } = useStudent();
  return (
    <RealtimeDatabaseDocProvider path={`/users/${id}`}>
      <HydratedProfileChip />
    </RealtimeDatabaseDocProvider>
  );
};

const HydratedProfileChip: React.FC = () => {
  const { firstName, id } = useStudent();
  const {
    profile: { role },
  } = useProfile();
  const { info } = useClassroom();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);
  const { data, status } = useRealtimeDatabaseDoc();
  const { screenType } = useScreenSize();

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  return (
    <>
      <div>
        <button
          onClick={openPopover}
          className="custom-button-color"
          id="top-center"
        >
          <div id="profileChip">
            <div id="starPoints" className="text-sm semibold color-nube">
              <IonIcon icon={StarNotSharp} />
              <IonText>
                {status === "ready" ? data?.totalStars ?? 0 : "\u00A0"}
              </IonText>
            </div>
            <div id="heartPoints" className="text-sm semibold color-nube">
              <IonIcon icon={heart} />
              <IonText>
                {status === "ready" ? data?.totalHearts ?? 0 : "\u00A0"}
              </IonText>
            </div>
            <IonText>
              <p
                className={`semibold color-suelo ${
                  screenType === "mobile" ? "text-lg" : "text-xl"
                }`}
              >
                {firstName}
              </p>
            </IonText>
            <Avatar id={id} size="md" />
          </div>
        </button>
      </div>

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
        <IonContent id="profile-chip-popover">
          <IonList>
            <Link
              to={`/profile/coming-soon`}
              className="no-underline"
              onClick={() => {
                setPopoverOpen(false);
              }}
            >
              <IonItem button={true} detail={false} lines="none">
                <IonIcon
                  icon={StudentAvatar}
                  style={{ marginRight: "0.5rem" }}
                />
                <IonText>
                  <h1 className="text-md semibold">
                    <I18nMessage id="settings.myProfile" />
                  </h1>
                  <I18nMessage
                    id="settings.myProfile"
                    level={2}
                    wrapper={(text: string) => (
                      <p className="text-sm">{text}</p>
                    )}
                  />
                </IonText>
              </IonItem>
            </Link>
            <Link
              to={role === "teacher" ? "/classrooms" : "/settings/overview"}
              className="no-underline"
              onClick={() => {
                setPopoverOpen(false);
              }}
            >
              <IonItem
                button={true}
                detail={false}
                lines="none"
                className="change-student"
              >
                <IonIcon icon={Settings} style={{ marginRight: "0.5rem" }} />
                <IonText>
                  <h1 className="text-md semibold">
                    <I18nMessage id="settings.grownup" />
                  </h1>
                  <I18nMessage
                    id="settings.grownup"
                    level={2}
                    wrapper={(text: string) => (
                      <p className="text-sm">{text}</p>
                    )}
                  />
                </IonText>
              </IonItem>
            </Link>

            <Link
              to={`/select-student/${info.id}`}
              className="no-underline"
              onClick={() => {
                setPopoverOpen(false);
              }}
            >
              <IonItem
                button={true}
                detail={false}
                lines="none"
                className="change-student"
              >
                <IonIcon
                  icon={StudentLogout}
                  style={{ marginRight: "0.5rem" }}
                />
                <IonText>
                  <h1 className="text-md semibold">
                    <I18nMessage id="settings.changeStudent" />
                  </h1>
                  <I18nMessage
                    id="settings.changeStudent"
                    level={2}
                    wrapper={(text: string) => (
                      <p className="text-sm">{text}</p>
                    )}
                  />
                </IonText>
              </IonItem>
            </Link>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
};
