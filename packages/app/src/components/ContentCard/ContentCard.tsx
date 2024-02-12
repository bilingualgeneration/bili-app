import { CategoryTag } from "@/components/CategoryTag";
import { FavoriteButton } from "@/components/FavoriteButton";
import LockIcon from "@/assets/icons/lock.svg?react";
import "./ContentCard.scss";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";

type ContentCardProps = {
  title: string;
  titleEn: string;
  fid?: string;
  category: string;
  cover: string;
  className?: string;
  isLocked?: boolean;
  link?: string;
};

const ComingSoon: React.FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div className="content-coming-soon">
      <IonText>
        <p className="text-xs semibold color-suelo">
          Próximamente{!isImmersive && " | Coming Soon"}
        </p>
      </IonText>
    </div>
  );
};

const Lock: React.FC = () => {
  return (
    <div className="content-lock">
      <LockIcon />
    </div>
  );
};

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  titleEn,
  fid = "",
  category,
  cover,
  className,
  isLocked = false,
  link,
}) => {
  const { isImmersive } = useProfile();
  const history = useHistory();
  return (
    <div
      className="content-card"
      style={{ backgroundImage: `url(${cover})` }}
      onClick={() => {
        if (link) {
          history.push(link);
        }
      }}
    >
      <CategoryTag category={category} />
      <FavoriteButton fid={fid} />
      <IonText>
        {isLocked && <ComingSoon />}
        <h1 className="text-2xl semibold color-nube">{title}</h1>
        {!isImmersive && <p className="text-sm color-nube">{titleEn}</p>}
      </IonText>
      {isLocked && <Lock />}
    </div>
  );
};
