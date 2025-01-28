import { PackSelect } from "@/components/PackSelect";

export const CountWithMeSelect: React.FC = () => {
  const placeholderCards = [
    {
      title: "Instruments",
      titleEn: "Instrumentos",
      category: "play",
      cover:
        "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/thumbnail_Image_Container3_49e525e22a.png",
      isLocked: true,
    },
    {
      title: "Sports",
      titleEn: "Deportes",
      category: "play",
      cover:
        "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/stories_friends_cover_e66b64561c.svg",
      isLocked: true,
    },
    {
      title: "Costumes",
      titleEn: "Disfraces",
      category: "play",
      cover:
        "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/4_cover_El_esqueleto_travieso_e992b9d069.svg",
      isLocked: true,
    },
  ];
  return (
    <PackSelect
      module="count-with-me"
      category="play"
      translatedTitle="Cuenta Conmigo"
      englishTitle="Count With Me"
      placeholderCards={placeholderCards}
    />
  );
};
