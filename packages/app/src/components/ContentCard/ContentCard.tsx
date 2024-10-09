import { CategoryTag } from "@/components/CategoryTag";
import classnames from "classnames";
import { FavoriteButton } from "@/components/FavoriteButton";
import LockIcon from "@/assets/icons/lock.svg?react";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import { useLanguageToggle } from "@/components/LanguageToggle";

import "./ContentCard.css";

export interface Pill {
  className?: string;
  primaryText: string;
  secondaryText?: string;
}

type ContentCardProps = {
  title: string;
  titleEn: string;
  fid?: string;
  category: string;
  cover: string;
  className?: string;
  isLocked?: boolean;
  link?: string;
  pills?: Pill[];
};

const Pill: React.FC<Pill> = ({
  className = "background-nube",
  primaryText,
  secondaryText,
}) => {
  return (
    <span className={classnames("content-card-pill", className)}>
      <IonText>
        <span className="text-xs semibold color-suelo">
          {primaryText}
          {secondaryText ? ` | ${secondaryText}` : ""}
        </span>
      </IonText>
    </span>
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
  category,
  className,
  cover,
  fid = "",
  isLocked = false,
  link,
  title,
  titleEn,
  pills = [],
}) => {
  const { language } = useLanguageToggle();
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
        {pills.map((pill) => (
          <Pill {...pill} key={pill.primaryText} />
        ))}
        <h1 className="text-2xl semibold color-nube">
          {language === "en" ? titleEn : title}
        </h1>
        {language === "esen" && <p className="text-sm color-nube">{titleEn}</p>}
      </IonText>
      {isLocked && <Lock />}
    </div>
  );
};
