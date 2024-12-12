// TODO: clean up after all calls to PackHeader have title and subtitle removed
import classnames from "classnames";
import { IonText } from "@ionic/react";
import pattern from "@/assets/icons/header_background_pattern.svg";
import { I18nMessage } from "@/components/I18nMessage";
import { isMobile } from "@/lib/isMobile";

import "./PackHeader.scss";

interface PackHeaderProps {
  bannerColor?: string;
  className?: string;
  id: string;
}

export const PackHeader: React.FC<PackHeaderProps> = ({
  bannerColor = "#ff5709",
  className,
  id,
}) => {
  return (
    <div
      className={classnames({ isMobile: isMobile() })}
      id="packBanner"
      style={{ backgroundColor: bannerColor }}
    >
      <div className="banner-overlay" />
      <IonText className="banner-content">
        {isMobile() && (
          <>
            <h1 className={classnames("text-xl", className)}>
              <span className="semibold">
                {" "}
                <I18nMessage id={id} />
              </span>{" "}
              <I18nMessage
                id={id}
                level={2}
                wrapper={(text: string) => `| ${text}`}
              />
            </h1>
          </>
        )}
        {!isMobile() && (
          <span className={classnames(className)}>
            <h1 className="text-5xl bold">
              <I18nMessage id={id} />
            </h1>
            <I18nMessage
              id={id}
              level={2}
              wrapper={(text: string) => <p className="text-3xl">{text}</p>}
            />
          </span>
        )}
      </IonText>
    </div>
  );
};
