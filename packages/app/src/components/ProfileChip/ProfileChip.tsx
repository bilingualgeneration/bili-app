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
import { useProfile } from "@/hooks/Profile";
import { heart } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import StarNotSharp from "@/assets/icons/star_profile.svg";
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";
import { Link } from "react-router-dom";
import "./ProfileChip.scss";
import {
  RealtimeDatabaseDocProvider,
  useRealtimeDatabaseDoc,
} from "@/hooks/RealtimeDatabaseDoc";
import { useRef, useState } from "react";
import { useLanguageToggle } from "../LanguageToggle";
import { useClassroom } from "@/hooks/Classroom";
import { useStudent } from "@/hooks/Student";
import { useScreenSize } from "@/lib/screenSize";

export const ProfileChip: React.FC = () => {
  const { id } = useStudent();
  return (
    <RealtimeDatabaseDocProvider path={`/users/${id}`}>
      <HydratedProfileChip />
    </RealtimeDatabaseDocProvider>
  );
};

const HydratedProfileChip: React.FC = () => {
  const { firstName } = useStudent();
  const { id: classroomId } = useClassroom();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);
  const { language } = useLanguageToggle();
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
            <img src={Avatar} className="ion-hide" />
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
                  style={{ marginRight: "0.4375rem" }}
                />
                <IonText>
                  <h1 className="text-md semibold">
                    {language !== "en" && `Mi perfil`}
                    {language === "en" && `My profile`}
                  </h1>
                  {language === "esen" && <p className="text-sm">My profile</p>}
                </IonText>
              </IonItem>
            </Link>

            <Link
              to={`/select-student/${classroomId}`}
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
                  style={{ marginRight: "0.4375rem" }}
                />
                <IonText>
                  <h1 className="text-md semibold">
                    {language !== "en" && `Cambiar de estudiante`}
                    {language === "en" && `Change student`}
                  </h1>
                  {language === "esen" && (
                    <p className="text-sm">Change student</p>
                  )}
                </IonText>
              </IonItem>
            </Link>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
};
