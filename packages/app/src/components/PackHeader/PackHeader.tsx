import { FC } from "react";
import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import pattern from "@/assets/icons/header_background_pattern.svg";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useScreenSize } from "@/lib/screenSize";

import "./PackHeader.scss";

interface PackHeaderProps {
  bannerColor?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const PackHeader: FC<PackHeaderProps> = ({
  bannerColor = "#ff5709",
  title,
  subtitle,
  titleClassName = "text-5xl color-nube",
  subtitleClassName = "text-3xl color-nube",
}) => {
  const { language } = useLanguageToggle();
  const { screenType } = useScreenSize();

  // mobile formats
  const isMobile = screenType === "mobile";
  const mobileTitleStyle = isMobile
    ? { display: "flex", flexDirection: "row", alignItems: "center" }
    : {};
  const mobileTitleClass = isMobile
    ? "text-2xl color-nube semibold"
    : titleClassName;
  const mobileSubtitleClass = isMobile
    ? "text-2xl color-nube"
    : subtitleClassName;

  return (
    <div id="packBanner" style={{ backgroundColor: bannerColor }}>
      <div className="banner-overlay" />
      <IonText
        className={`banner-content ${isMobile ? "text-2xl" : ""}`}
        style={mobileTitleStyle}
      >
        <h1 className={mobileTitleClass}>{title}</h1>
        {language === "esen" && isMobile && (
          // vertical bar only for mobile
          <span style={{ margin: "0 0.5rem" }}>|</span>
        )}
        {language === "esen" && (
          <p className={mobileSubtitleClass}>{subtitle}</p>
        )}
      </IonText>
    </div>
  );
};
