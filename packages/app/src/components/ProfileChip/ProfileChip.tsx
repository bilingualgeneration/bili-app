import { FC } from "react";
import { IonText, IonIcon } from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";
import { starSharp } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import "./ProfileChip.scss";

export const ProfileChip: FC = () => {
  const { name, isImmersive } = useProfile();
  return (
    <div id="profileChip">
      <div id="profilePoints">
        <IonIcon icon={starSharp} />
        <IonText>73</IonText>
      </div>
      <IonText>
        <h2>{name}</h2>
      </IonText>
      <img src={Avatar} />
    </div>
  );
};
