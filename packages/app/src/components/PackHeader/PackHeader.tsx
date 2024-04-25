import { FC } from "react";
import { IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import pattern from "@/assets/icons/header_background_pattern.svg";
import {useLanguageToggle} from '@/components/LanguageToggle';

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
  const {language} = useLanguageToggle();
  return (
    <div id="packBanner" style={{ backgroundColor: bannerColor }}>
      <div className="banner-overlay" style={{ backgroundColor: bannerColor }}/>
      <IonText className="banner-content">
        <h1 className={`${titleClassName}`}>
	  {title}
        </h1>
        {language === 'esen' &&
          <p className={`${subtitleClassName}`}>
            {subtitle}
          </p>
        }
      </IonText>
    </div>
  );
};
