import React, { FC } from "react";
import { PackHeader } from "@/components/PackHeader";
import { ComingSoonCard } from "@/components/ProfileComingSoon";
import stars from "@/assets/icons/profile_coming_soon/coming_soon_card_stars.svg";
import stickers from "@/assets/icons/profile_coming_soon/coming_soon_card_stickers.svg";
import bili from "@/assets/icons/profile_coming_soon/coming_soon_card_bili.svg";
import { Carousel } from "@/components/Carousel";
import biliWorkshop from "@/assets/icons/profile_coming_soon/bili_workshop.svg";
import bigHeart from "@/assets/icons/profile_coming_soon/heart_big.svg";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/hooks/I18n";
import { I18nMessage } from "@/components/I18nMessage";

export const ProfileComingSoon: FC = () => {
  const { language } = useLanguageToggle();
  const profileCards = [
    {
      cardColor: "#9A90F0",
      text: [
        {
          text: "Gana estrellas para desbloquear logros.",
          language: "es",
        },
        {
          text: "Earn stars to unlock achievements",
          language: "en",
        },
      ],
      cardImage: stars,
    },

    {
      cardColor: "#FF5708",
      text: [
        {
          text: "Colecciona calcomanías mientras juegas",
          language: "es",
        },
        {
          text: "Collect stickers as you play",
          language: "en",
        },
      ],
      cardImage: stickers,
    },
    {
      cardColor: "#EC59B1",
      text: [
        {
          text: "Sube de nivel tu perfil a medida que aprendes",
          language: "es",
        },
        {
          text: "Level up your profile as you learn",
          language: "en",
        },
      ],
      cardImage: bili,
    },
    {
      cardColor: "#FFD8EB",
      text: [
        {
          text: "Guarda tus juegos y cuentos favoritos",
          language: "es",
        },
        {
          text: "Save your favorite games and stories",
          language: "en",
        },
      ],
      textColor: "base-suelo",
      cardImage: bigHeart,
    },
  ];

  return (
    <>
      <PackHeader
        bannerColor="#FFF8F0"
        id="studentProfile.comingSoon.title"
        className="color-suelo"
      />
      <div
        className="padding-horizontal-3"
        style={{
          background: `url(${biliWorkshop}) no-repeat top 0 right 2rem`,
          backgroundSize: "contain",
        }}
      >
        <h1 className="text-6xl bold">
          <I18nMessage id={"studentProfile.comingSoon.features"} />
        </h1>
        <I18nMessage
          id={"studentProfile.comingSoon.features"}
          level={2}
          wrapper={(text: string) => (
            <p className="text-4xl color-english">{text}</p>
          )}
        />
        <div className="margin-top-3">
          <Carousel height={240} slideMargin={15} infinite={true}>
            {profileCards.map((card, index) => (
              <ComingSoonCard {...card} key={index} />
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};
