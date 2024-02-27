import React, {FC} from "react";
import { useProfile } from "@/contexts/ProfileContext";
import "./ComingSoon.scss";

interface ComingSoonCardProps {
    cardColor: string;
    title: string;
    subtitle: string;
    cardImage: string;
}

export const ComingSoonCard: FC<ComingSoonCardProps> = ({
    cardColor,
    title,
    subtitle,
    cardImage
  }) => {
    const { isImmersive } = useProfile();
    return (
      <div id="coming-soon-card" className="card-styles" style={{ backgroundColor: cardColor }}>
        <img src={cardImage} alt="Card Image" className="card-image" />
        <div className="card-text">
          <h1 className="text-3xl semibold color-nube">
              {title}
          </h1>
          {!isImmersive &&
            <p className="text-2xl color-nube subtitle">
                {subtitle}
            </p>
          }
        </div>
      </div>
    );
  };