import { FC } from "react";
import { IonText, IonIcon } from "@ionic/react";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { starSharp } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import { Link } from "react-router-dom";
import "./ProfileChip.scss";

export const ProfileChip: FC = () => {
  const { childProfiles, activeChildProfile } = useChildProfile();
  const { completionPoints, name } = childProfiles[activeChildProfile];

  return (
    <Link to="/tradein">
      <div id="profileChip">
        <div id="profilePoints" className="text-sm semibold color-nube">
          <IonIcon icon={starSharp} />
          <IonText>{completionPoints || 0}</IonText>
        </div>
        <IonText>
          <p className="text-xl semibold color-suelo">{name}</p>
        </IonText>
        <img src={Avatar} />
      </div>
    </Link>
  );
};
