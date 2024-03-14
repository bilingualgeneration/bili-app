import React, {FC} from "react";
import { PlayHeader } from "@/components/PlayHeader";
import { useProfile } from "@/contexts/ProfileContext";
import { ComingSoonCard } from "@/components/ProfileComingSoon";
import stars from "@/assets/icons/profile_coming_soon/coming_soon_card_stars.svg";
import stickers from "@/assets/icons/profile_coming_soon/coming_soon_card_stickers.svg";
import bili from "@/assets/icons/profile_coming_soon/coming_soon_card_bili.svg";
import { Carousel } from "@/components/Carousel";
import "./ProfileComingSoon.scss";
import biliHelmet from "@/assets/icons/profile_coming_soon/bili_profile_coming_soon.svg";
import biliWorkshop from "@/assets/icons/profile_coming_soon/bili_workshop.svg";

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
      <>
        <PlayHeader 
            bannerColor="#FFF8F0"
            title="Mi Perfil - Próximamente" 
            subtitle="My Profile - Coming Soon!"
            titleClassName="text-5xl color-suelo"
            subtitleClassName="text-3xl color-english semibold"
        />
        <div className="content-container">   
          <div className="heading-container">
            <h1 className="text-6xl bold carousel-header-margin">
              Nuevas funciones en camino
            </h1>
            {!isImmersive &&
              <p className="text-4xl color-english">
                New features on the way
              </p>
            }
          </div>

          <img src={biliHelmet} alt="Bili Character Icon" className="bili-helmet-image"/>

          <div className="margin-top-3">
            <Carousel 
              height={240} 
              slideMargin={15}
              infinite={true}
            >
              {profileCards.map((card, index) => (
                <ComingSoonCard
                  {...card}
                  key={index}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </>
    );
};
