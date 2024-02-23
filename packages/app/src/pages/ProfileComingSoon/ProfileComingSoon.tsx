import React, {FC} from "react";
import { PlayHeader } from "@/components/PlayHeader";
import { useProfile } from "@/contexts/ProfileContext";
import { ComingSoonCard } from "@/components/ProfileComingSoon";

export const ProfileComingSoon: FC = () => {
    const { isImmersive } = useProfile();
    const cards = [];

    return (
      <div>
        <PlayHeader 
            bannerColor="#FFF8F0"
            title="Mi Perfil - Próximamente" 
            subtitle="My Profile - Coming Soon!"
            titleClassName="text-5xl color-suelo"
            subtitleClassName="text-3xl color-english semibold"
        />

        <div>
          <h1 className="text-6xl bold">
            Nuevas funciones en camino
          </h1>
          {!isImmersive &&
            <p className="text-4xl color-english">
              New features on the way
            </p>
          }
        </div>

        {/* <ComingSoonCard 
          
        /> */}
      </div>
    );
};