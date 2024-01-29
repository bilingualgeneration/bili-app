import { FC } from "react";
import { IonText, IonIcon } from "@ionic/react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { starSharp } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import "./ProfileChip.scss";

export const ProfileChip: FC = () => {
  const {
    activeChildProfile: { name, completionPoints },
  } = useChildProfile();
  return (
    <div id="profileChip">
      <div id="profilePoints">
        <IonIcon icon={starSharp} />
        <IonText>{completionPoints || 0}</IonText>
      </div>
      <IonText>
        <p>{name}</p>
      </IonText>
      <img src={Avatar} />
    </div>
  );
};
