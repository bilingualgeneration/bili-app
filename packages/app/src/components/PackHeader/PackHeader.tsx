// TODO: clean up after all calls to PackHeader have title and subtitle removed

import { IonText } from "@ionic/react";
import pattern from "@/assets/icons/header_background_pattern.svg";
import { I18nMessage } from "@/components/I18nMessage";
import { useLanguage } from "@/hooks/Language";
import { useScreenSize } from "@/lib/screenSize";

import "./PackHeader.scss";

interface PackHeaderProps {
  id?: string;
  bannerColor?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const PackHeader: React.FC<PackHeaderProps> = ({
  bannerColor = "#ff5709",
  id,
  title,
  subtitle,
  titleClassName = "text-5xl color-nube",
  subtitleClassName = "text-3xl color-nube",
}) => {
  const { language } = useLanguage();
  const { screenType } = useScreenSize();
  const isMobile = screenType === "mobile";
  const mobileTitleClass = "text-2xl color-nube semibold";
  const mobileSubtitleClass = "text-2xl color-nube";

  if (id) {
    return (
      <div id="packBanner" style={{ backgroundColor: bannerColor }}>
        <div className="banner-overlay" />
        <IonText className="banner-content">
          <h1 className={isMobile ? mobileTitleClass : titleClassName}>
            <I18nMessage id={id} />
          </h1>
          {isMobile && <span className="separator">|</span>}
          {isMobile ? (
            <I18nMessage
              id={id}
              level={2}
              wrapper={(text: string) => (
                <p className={mobileSubtitleClass}>{text}</p>
              )}
            />
          ) : (
            <I18nMessage
              id={id}
              level={2}
              wrapper={(text: string) => (
                <p className={subtitleClassName}>{text}</p>
              )}
            />
          )}
        </IonText>
      </div>
    );
  } else {
    return (
      <div id="packBanner" style={{ backgroundColor: bannerColor }}>
        <div className="banner-overlay" />
        <IonText
          className="banner-content"
          style={
            isMobile
              ? {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.625rem",
                }
              : {}
          }
        >
          <h1 className={isMobile ? mobileTitleClass : titleClassName}>
            {title}
          </h1>
          {isMobile && subtitle && (
            <>
              <span className="separator">|</span>
              <p className={mobileSubtitleClass}>{subtitle}</p>
            </>
          )}
          {!isMobile && subtitle && (
            <p className={subtitleClassName}>{subtitle}</p>
          )}
        </IonText>
      </div>
    );
  }
};
