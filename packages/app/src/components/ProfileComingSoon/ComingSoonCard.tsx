import React, {FC} from "react";
import { useProfile } from "@/contexts/ProfileContext";

interface ComingSoonCardProps {
    cardColor: string;
    title: string;
    subtitle: string;
    cardImage: React.ReactNode;
}

export const ComingSoonCard: FC<ComingSoonCardProps> = ({
    cardColor,
    title,
    subtitle,
  }) => {
    const { isImmersive } = useProfile();
    return (
      <div id="coming-soon-card" style={{ backgroundColor: cardColor }}>
        <h1 className="text-3xl semibold">
            {title}
        </h1>
        {!isImmersive &&
            <p className="text-2xl">
                {subtitle}
            </p>
        }
      </div>
    );
  };