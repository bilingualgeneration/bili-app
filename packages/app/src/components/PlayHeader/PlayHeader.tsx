import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/hooks/Profile";
import pattern from "@/assets/icons/header_background_pattern.svg";

import "./PlayHeader.scss";

interface PlayHeaderProps {
  bannerColor?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const PlayHeader: React.FC<PlayHeaderProps> = ({
  bannerColor = "#ff5709",
  title,
  subtitle,
  titleClassName = "text-5xl color-nube",
  subtitleClassName = "text-3xl color-nube",
}) => {
  const { profile: {isImmersive} } = useProfile();
  return (
    <div id="playBanner" style={{ backgroundColor: bannerColor }}>
      <div className="banner-overlay" style={{ backgroundColor: bannerColor }}/>
      <IonText className="banner-content">
        <h1 className={`${titleClassName}`}>
          {title}
        </h1>
        {!isImmersive &&
          <p className={`${subtitleClassName}`}>
            {subtitle}
          </p>
        }
      </IonText>
    </div>
  );
};
