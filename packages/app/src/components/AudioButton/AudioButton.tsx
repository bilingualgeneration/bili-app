import { IonText, IonIcon, IonPopover, IonList, IonItem, IonContent, IonButton, IonLabel } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import { starSharp } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import StudentLogout from "@/assets/icons/logout.svg";
import { Link } from "react-router-dom";
import "./AudioButton.scss";
import { useRef, useState } from "react";
import { useLanguageToggle } from "../LanguageToggle";

export const AudioButton: React.FC = () => {

  const { language } = useLanguageToggle();


  return (

    <>
      <div>
        <button onClick={} className="" id="">
          <div id="">
            
          </div>
        </button>
      </div>

    </>
  );
};
