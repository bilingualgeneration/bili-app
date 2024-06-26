import { CategoryTag } from "@/components/CategoryTag";
import classnames from "classnames";
import { FavoriteButton } from "@/components/FavoriteButton";
import LockIcon from "@/assets/icons/lock.svg?react";
import "./ContentCard.scss";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import {useLanguageToggle} from '@/components/LanguageToggle';

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
  const {language} = useLanguageToggle();
  return (
    <div className="content-coming-soon">
      <IonText>
        <p className="text-xs semibold color-suelo">
	  {language === 'en' && 'Coming Soon'}
	  {language === 'es' && 'Próximamente'}
	  {language === 'esen' && 'Próximamente | Coming Soon'}
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
  const {language} = useLanguageToggle();
  const history = useHistory();
  return (
    <div
      className={classnames("content-card", { "has-link": link !== undefined })}
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
        <h1 className="text-2xl semibold color-nube">
	  {language === 'en' ? titleEn : title}
	</h1>
        {language === 'esen' && <p className="text-sm color-nube">{titleEn}</p>}
      </IonText>
      {isLocked && <Lock />}
    </div>
  );
};
