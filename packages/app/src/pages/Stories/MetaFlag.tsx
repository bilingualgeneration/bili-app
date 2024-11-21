import classnames from "classnames";
import { I18nMessage } from "@/components/I18nMessage";
import { IonText } from "@ionic/react";
import { useLanguage } from "@/hooks/Language";

interface MetaFlag {
  color: string;
  id: string;
  isTranslanguaged?: boolean;
}

export const MetaFlag: React.FC<MetaFlag> = ({
  color,
  id,
  isTranslanguaged = false,
}) => {
  const { languageCount } = useLanguage();
  return (
    <div
      id="story-title-card-flag"
      className={classnames(`background-${color}`, {
        "single-line": languageCount === 1,
      })}
    >
      <IonText>
        <div className="text-xs semibold color-suelo">
          <I18nMessage id={id} />
        </div>
        {!isTranslanguaged && (
          <I18nMessage
            id={id}
            level={2}
            wrapper={(text: string) => (
              <div className="text-xs color-grey">{text}</div>
            )}
          />
        )}
      </IonText>
    </div>
  );
};
