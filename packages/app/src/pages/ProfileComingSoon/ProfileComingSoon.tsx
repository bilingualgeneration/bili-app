import React, {FC} from "react";
import { PlayHeader } from "@/components/PlayHeader";
import { useProfile } from "@/contexts/ProfileContext";
import { ComingSoonCard } from "@/components/ProfileComingSoon";
import stars from "@/assets/icons/profile_coming_soon/coming_soon_card_stars.svg";
import stickers from "@/assets/icons/profile_coming_soon/coming_soon_card_stickers.svg";
import bili from "@/assets/icons/profile_coming_soon/coming_soon_card_bili.svg";
import { Carousel } from "@/components/Carousel";

export const ProfileComingSoon: FC = () => {
    const { isImmersive } = useProfile();
    const profileCards = [
      {
        cardColor: "#9A90F0",
        title: "Gana estrellas para desbloquear logros.",
        subtitle: "Earn stars to unlock achievements",
        cardImage: stars,
      },
      {
        cardColor: "#FF5708",
        title: "Colecciona calcomanías mientras juegas",
        subtitle: "Collect stickers as you play",
        cardImage: stickers,
      },
      {
        cardColor: "#EC59B1",
        title: "Sube de nivel tu perfil a medida que aprendes",
        subtitle: "Level up your profile as you learn",
        cardImage: bili,
      }
    ];

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

        <Carousel height={300}>
          {profileCards.map((card, index) => (
            <ComingSoonCard
              {...card}
              key={index}
            />
          ))}
        </Carousel>
      </div>
    );
};