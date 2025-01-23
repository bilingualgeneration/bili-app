import { CategoryTag } from "@/components/CategoryTag";
import classnames from "classnames";
import { ContentLock } from "@/components/ContentLock";
import { FavoriteButton } from "@/components/FavoriteButton";
import { I18nMessage } from "@/components/I18nMessage";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import { useLanguage } from "@/hooks/Language";
import { useLanguageToggle } from "@/components/LanguageToggle";

import "./ContentCard.scss";

export interface Pill {
  className?: string;
  i18nKey?: string;
  primaryText?: string;
  secondaryText?: string;
}

// TODO: convert support of title and titleEn to titles

type ContentCardProps = {
  title?: string;
  titleEn?: string;
  titles?: any[]; // assume each item is an object with text prop
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
  i18nKey,
}) => {
  return (
    <span className={classnames("content-card-pill", className)}>
      {primaryText && (
        <IonText>
          <span className="text-xs semibold color-suelo">
            {primaryText}
            {secondaryText ? ` | ${secondaryText}` : ""}
          </span>
        </IonText>
      )}
      {i18nKey && (
        <IonText>
          <span className="text-xs semibold color-suelo">
            <I18nMessage id={i18nKey} />
            {i18nKey !== "story.pill.translanguaged" && (
              <I18nMessage
                id={i18nKey}
                level={2}
                wrapper={(t: string) => ` | ${t}`}
              />
            )}
          </span>
        </IonText>
      )}
    </span>
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
  titles,
  pills = [],
}) => {
  const { language } = useLanguage();
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
        {title && (
          <h1 className="text-2xl semibold color-nube">
            {language === "en" ? titleEn : title}
          </h1>
        )}
        {titleEn && (language === "es.en" || language === "en.es") && (
          <p className="text-sm color-nube">{titleEn}</p>
        )}
        {titles && (
          <>
            <h1 className="text-2xl semibold color-nube">{titles[0].text}</h1>
            {titles.length > 1 && (
              <p className="text-sm color-nube">{titles[1].text}</p>
            )}
          </>
        )}
      </IonText>
      {isLocked && <ContentLock borderRadius="0.75rem" />}
    </div>
  );
};
