import { FC } from "react";
import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";

import "./PlayHeader.scss";

interface PlayHeaderProps {
  bannerColor?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const PlayHeader: FC<PlayHeaderProps> = ({
  bannerColor = "#ff5709",
  title,
  subtitle,
  titleClassName = "text-5xl color-nube",
  subtitleClassName = "text-3xl color-nube",
}) => {
  const { isImmersive } = useProfile();
  return (
    <div id="playBanner" style={{ backgroundColor: bannerColor }}>
      <IonText>
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
