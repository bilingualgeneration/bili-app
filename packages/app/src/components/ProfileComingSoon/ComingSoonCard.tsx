import React, {FC} from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import "./ComingSoonCard.scss";

interface ComingSoonCardProps {
    cardColor: string;
    title: string;
    subtitle: string;
    cardImage: string;
}

export const ComingSoonCard: FC<ComingSoonCardProps> = ({
    cardColor,
    title, // es
    subtitle, // en
    cardImage
  }) => {
    const {language} = useLanguageToggle();
    return (
      <div id="coming-soon-card" className="card-styles" style={{ backgroundColor: cardColor }}>
        <img src={cardImage} alt="Card Image" className="card-image" />
        <div className="card-text">
          <h1 className="text-3xl semibold color-nube">
            {language !== 'en' && title}
	    {language === 'en' && subtitle}
          </h1>
          {language === 'esen' &&
            <p className="text-2xl color-nube subtitle">
                {subtitle}
            </p>
          }
        </div>
      </div>
    );
  };
