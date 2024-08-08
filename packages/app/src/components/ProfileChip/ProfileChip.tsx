import { IonText, IonIcon, IonPopover, IonList, IonItem, IonContent, IonButton, IonLabel } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import { heart } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import StarNotSharp from "@/assets/icons/star_profile.svg"
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";
import { Link } from "react-router-dom";
import "./ProfileChip.scss";
import { useRef, useState } from "react";
import { useLanguageToggle } from "../LanguageToggle";

const defaultChildProfile = {
  completionPoints: 0,
  name: ''
}

export const ProfileChip: React.FC = () => {
  /*
  const { childProfiles, activeChildProfile } = useChildProfile();
   */
  const {activeChildProfile} = useProfile();
  const { completionPoints, name } = activeChildProfile || defaultChildProfile;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);
  const { language } = useLanguageToggle();

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };


  return (

    <>
      <div>
        <button onClick={openPopover} className="custom-button-color" id="top-center">
          <div id="profileChip">
            <div id="starPoints" className="text-sm semibold color-nube">
              <IonIcon icon={StarNotSharp} />
              <IonText>{completionPoints || 0}</IonText>
            </div>
            <div id="heartPoints" className="text-sm semibold color-nube">
              <IonIcon icon={heart} />
              <IonText>{completionPoints || 0}</IonText>
            </div>
            <IonText>
              <p className="text-xl semibold color-suelo">{name}</p>
            </IonText>
            <img src={Avatar} />
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
        arrow = {false}
        className="profile-popover-style"

      >
        <IonContent id="profile-chip-popover">
          <IonList>
            <IonItem
              button={true}
              detail={false}
              lines="none"
              href="/profile/coming-soon"
            >
              <IonIcon icon={StudentAvatar} style={{marginRight: "7px"}}/>
              <IonText>
                <h1 className="text-md semibold">
                  {language !== 'en' && `Mi perfil`}
                  {language === 'en' && `My profile`}
                </h1>
                {language === 'esen' &&
                  <p className="text-sm">
                    My profile
                  </p>
                }
              </IonText>
            </IonItem>

            <IonItem
              button={true}
              detail={false}
              lines="none"
              className="change-student"
              href="/student"
            >
              <IonIcon icon={StudentLogout} style={{marginRight: "7px"}}/>
              <IonText >
                <h1 className="text-md semibold">
                  {language !== 'en' && `Cambiar de estudiante`}
                  {language === 'en' && `Change student`}
                </h1>
                {language === 'esen' &&
                  <p className="text-sm">
                    Change student
                  </p>
                }
              </IonText>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
};
