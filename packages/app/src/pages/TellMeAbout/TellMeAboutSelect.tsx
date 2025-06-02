import { PackSelect } from "@/components/StrapiPackSelect";

export const TellMeAboutSelect: React.FC = () => {
  const placeholderCards = [
    {
      title: "Nivel 3",
      titleEn: "Level 3",
      category: "community",
      cover: "/assets/img/mountain_image.png",
      isLocked: true,
    },
    {
      title: "Nivel 4",
      titleEn: "Level 4",
      category: "community",
      cover:
        "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/thumbnail_drum_image_42dab560fb.png",
      isLocked: true,
    },
    {
      title: "Nivel 5",
      titleEn: "Level 5",
      category: "community",
      cover: "/assets/img/boot_image.png",
      isLocked: true,
    },
  ];
  return (
    <PackSelect
      module="tell-me-about"
      category="community"
      translatedTitle="Cuéntame sobre..."
      englishTitle="Tell me about..."
      placeholderCards={placeholderCards}
    />
  );
};
