import { PackSelect } from "@/components/StrapiPackSelect";

export const IntruderSelect: React.FC = () => {
  const placeholderCards = [
    {
      title: "Paquete 2",
      titleEn: "Pack 2",
      category: "play",
      cover: "/assets/img/boot_image.png",
      isLocked: true,
    },
    {
      title: "Paquete 3",
      titleEn: "Pack 3",
      category: "play",
      cover: "/assets/img/horse_image.png",
      isLocked: true,
    },
    {
      title: "Paquete 4",
      titleEn: "Pack 4",
      category: "play",
      cover: "/assets/img/mountain_image.png",
      isLocked: true,
    },
  ];
  return (
    <PackSelect
      module="intruder"
      category="play"
      translatedTitle="El Intruso"
      englishTitle="The Intruder"
      placeholderCards={placeholderCards}
    />
  );
};
