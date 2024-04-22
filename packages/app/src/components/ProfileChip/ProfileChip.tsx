import { IonText, IonIcon } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import { starSharp } from "ionicons/icons";
import Avatar from "@/assets/icons/avatar.png";
import { Link } from "react-router-dom";
import "./ProfileChip.scss";

export const ProfileChip: React.FC = () => {
  /*
  const { childProfiles, activeChildProfile } = useChildProfile();
   */
  const { activeChildProfile: {completionPoints, name} } = useProfile();
  return (
    <Link to="/profile/coming-soon" className="no-text-decoration">
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
