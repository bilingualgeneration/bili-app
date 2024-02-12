import { FormattedMessage } from "react-intl";
import { gameControllerOutline } from "ionicons/icons";
import Heart from "@/assets/icons/heart.svg?react";
import { IonCard, IonIcon, IonText } from "@ionic/react";
import { Link } from "react-router-dom";
import { PlayHeader } from "@/components/PlayHeader";
import { ContentCard } from "@/components/ContentCard";
import { useProfile } from "@/contexts/ProfileContext";
import { Carousel } from "@/components/Carousel";

interface props {
  headerComponent: React.ReactNode;
  module: string;
  packId: string;
  translatedTitle: React.ReactNode;
  englishTitle: string;
}

export const PackSelect: React.FC<props> = ({
  headerComponent,
  module,
  packId,
  translatedTitle,
  englishTitle,
}) => {
  const { isImmersive } = useProfile();
  const cards = [
    {
      fid: `${module}-${packId}`,
      title: "Paquete 1",
      titleEn: "Pack 1",
      category: "play",
      cover: "/assets/img/drum_image.png",
      isLocked: false,
      link: `/${module}/play/${packId}`,
    },
    {
      title: "Paquete 2",
      titleEn: "Pack 2",
      category: "play",
      cover: "/assets/img/drum_image.png",
      isLocked: true,
    },
    {
      title: "Paquete 3",
      titleEn: "Pack 3",
      category: "play",
      cover: "/assets/img/band_image.png",
      isLocked: true,
    },
  ];
  return (
    <>
      {headerComponent}
      <Carousel slidesToShow={2} height={274}>
        {cards.map((c, index) => (
          <ContentCard {...c} key={index} />
        ))}
      </Carousel>
    </>
  );
};
