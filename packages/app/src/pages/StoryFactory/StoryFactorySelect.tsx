import { PackSelect } from "@/components/StrapiPackSelect";

export const StoryFactorySelect: React.FC = () => {
  const placeholderCards = [
    {
      title: "Pre lector",
      titleEn: "Pre-reader",
      category: "play",
      cover:
        "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/thumbnail_Image_Container3_49e525e22a.png",
      isLocked: true,
      //link: "/story-factory/play/pre-reader",
    },
    {
      title: "Lector temprano",
      titleEn: "Early reader",
      category: "play",
      cover:
        "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/drum_image_c3729d3060.png",
      link: "/story-factory/play/early-reader",
    },
    {
      title: "Lector avanzado",
      titleEn: "Advanced reader",
      category: "play",
      cover:
        "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/thumbnail_Image_Container3_49e525e22a.png",
      isLocked: true,
    },
  ];
  return (
    <PackSelect
      module="story-factory"
      category="play"
      translatedTitle="¡Fábrica de Cuentos!"
      englishTitle="Story Factory"
      placeholderCards={placeholderCards}
      sortBy="level"
    />
  );
};
